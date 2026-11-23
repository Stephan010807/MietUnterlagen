import { redirect } from 'next/navigation';
export default function CheckoutReturn() {
  redirect('/formular?zahlung=zurueck#mappe');
}
