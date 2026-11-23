export const DRAFT_KEY = 'mietunterlagen-draft-v1';
export const PURCHASE_KEY = 'mietunterlagen-purchase-v1';
export const CHECKOUT_KEY = 'mietunterlagen-checkout-v1';
export const LEGACY_KEY = 'mieter-selbstauskunft-form';

export function clearBrowserData(storage: Pick<Storage, 'removeItem'>) {
  for (const key of [DRAFT_KEY, PURCHASE_KEY, CHECKOUT_KEY, LEGACY_KEY]) storage.removeItem(key);
}
