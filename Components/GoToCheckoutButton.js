import Link from 'next/link';

export default function GoToCheckoutButton() {
  return (
    <Link href="http://examplestore-test/Checkout">
      <button data-test-id="cart-checkout">Go to checkout</button>
    </Link>
  );
}
