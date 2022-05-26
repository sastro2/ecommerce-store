import Link from 'next/link';

export default function GoToCheckoutButton() {
  return (
    <Link href="http://localhost:3000/Checkout">
      <button data-test-id="cart-checkout">Go to checkout</button>
    </Link>
  );
}
