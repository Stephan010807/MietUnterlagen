import assert from 'node:assert/strict';
import test from 'node:test';
import nock from 'nock';
import Stripe from 'stripe';
import { PDFDocument } from 'pdf-lib';
import { POST as checkout } from '../src/app/api/checkout/route';
import { POST as packet, PUT as verify } from '../src/app/api/mappe/route';
import { POST as webhook } from '../src/app/api/webhook/route';
import { secretHash } from '../src/lib/stripe';
import { emptyApplication } from '../src/lib/application';
import { OFFER } from '../src/lib/constants';

const origin = 'http://localhost:3000';
const webhookSecret = 'whsec_test_fixture';
const id = 'cs_test_1234567890abcdefghij';
const secret = '1'.repeat(64);
const recovery = { id, secret };
const created = Math.floor(Date.now() / 1000) - 60;
const valid = {
  id, livemode: false, mode: 'payment', status: 'complete', payment_status: 'paid',
  metadata: { offer: OFFER.id, recovery: secretHash(secret) }, amount_total: OFFER.amount, currency: OFFER.currency,
  payment_intent: {
    status: 'succeeded', amount_received: OFFER.amount, currency: OFFER.currency,
    latest_charge: { amount: OFFER.amount, currency: OFFER.currency, paid: true, captured: true,
      amount_refunded: 0, refunded: false, disputed: false, created },
  },
};

function configured() {
  process.env.CHECKOUT_MODE = 'test';
  process.env.CHECKOUT_ORIGIN = origin;
  process.env.STRIPE_SECRET_KEY = 'sk_test_fixture';
  process.env.STRIPE_WEBHOOK_SECRET = webhookSecret;
}

function request(path: string, body: unknown, method = 'POST', requestOrigin = origin) {
  return new Request(origin + path, {
    method, body: JSON.stringify(body), headers: { origin: requestOrigin, 'content-type': 'application/json' },
  });
}

function mockSession(session: object) {
  return nock('https://api.stripe.com').get(`/v1/checkout/sessions/${id}`)
    .query(true).reply(200, session);
}

nock.disableNetConnect();

test('fails closed with missing or mismatched mode configuration', async () => {
  configured();
  delete process.env.STRIPE_SECRET_KEY;
  assert.equal((await checkout(request('/api/checkout', { secret }))).status, 503);
  assert.equal((await verify(request('/api/mappe', recovery, 'PUT'))).status, 503);
  configured();
  process.env.CHECKOUT_MODE = 'live';
  assert.equal((await checkout(request('/api/checkout', { secret }))).status, 503);
});

test('checkout accepts only the random recovery secret and binds the server offer', async () => {
  configured();
  assert.equal((await checkout(request('/api/checkout', { secret, email: 'test@example.com' }))).status, 400);
  assert.equal((await checkout(request('/api/checkout', { secret }, 'POST', 'https://example.org'))).status, 403);
  const scope = nock('https://api.stripe.com').post('/v1/checkout/sessions', (body) => {
    const data = typeof body === 'string' ? new URLSearchParams(body) : body;
    const serialized = JSON.stringify(data instanceof URLSearchParams ? Object.fromEntries(data) : data);
    return serialized.includes(String(OFFER.amount)) && serialized.includes(OFFER.id) &&
      serialized.includes(secretHash(secret)) && !serialized.includes(secret);
  }).matchHeader('idempotency-key', `checkout:${OFFER.id}:${secretHash(secret)}`)
    .reply(200, { id, url: 'https://checkout.stripe.com/test' });
  const result = await checkout(request('/api/checkout', { secret }));
  assert.deepEqual(await result.json(), { id, url: 'https://checkout.stripe.com/test' });
  scope.done();
});

test('only correct recovery and independently verified Stripe payment permit export', async () => {
  configured();
  const draft = { application: { ...emptyApplication, name: 'Jana Müller' }, letter: 'Guten Tag!' };
  for (const [attempt, session] of [
    [{ ...recovery, secret: '2'.repeat(64) }, valid],
    [recovery, { ...valid, payment_status: 'unpaid' }],
    [recovery, { ...valid, livemode: true }],
    [recovery, { ...valid, currency: 'usd' }],
    [recovery, { ...valid, amount_total: 100 }],
    [recovery, { ...valid, metadata: { ...valid.metadata, offer: 'anderes-produkt' } }],
    [recovery, { ...valid, payment_intent: { ...valid.payment_intent, latest_charge: { ...valid.payment_intent.latest_charge, amount_refunded: 1 } } }],
    [recovery, { ...valid, payment_intent: { ...valid.payment_intent, latest_charge: { ...valid.payment_intent.latest_charge, disputed: true } } }],
    [recovery, { ...valid, payment_intent: { ...valid.payment_intent, latest_charge: { ...valid.payment_intent.latest_charge, created: created - 31 * 86400 } } }],
  ] as const) {
    const scope = mockSession(session);
    assert.equal((await packet(request('/api/mappe', { recovery: attempt, packet: draft }))).status, 403);
    scope.done();
  }
  const verifyScope = mockSession(valid);
  assert.equal((await verify(request('/api/mappe', recovery, 'PUT'))).status, 200);
  verifyScope.done();
  const exportScope = mockSession(valid);
  const response = await packet(request('/api/mappe', { recovery, packet: draft }));
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.equal((await PDFDocument.load(await response.arrayBuffer())).getPageCount(), 2);
  exportScope.done();
});

test('signed webhook retries have no fulfilment side effects; rejects other modes and invalid signatures', async () => {
  configured();
  const stripe = new Stripe('sk_test_fixture');
  const payload = JSON.stringify({ id: 'evt_test', type: 'checkout.session.completed', livemode: false });
  const validSig = stripe.webhooks.generateTestHeaderString({ payload, secret: webhookSecret });
  const call = (body: string, signature: string) => webhook(new Request(origin + '/api/webhook', {
    method: 'POST', body, headers: { 'stripe-signature': signature },
  }));
  for (let retry = 0; retry < 2; retry++) assert.equal((await call(payload, validSig)).status, 200);
  assert.equal((await call(payload, 'invalid')).status, 400);
  const live = payload.replace('false', 'true');
  const liveSig = stripe.webhooks.generateTestHeaderString({ payload: live, secret: webhookSecret });
  assert.equal((await call(live, liveSig)).status, 400);
});
