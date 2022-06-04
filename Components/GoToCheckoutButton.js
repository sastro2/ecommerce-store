import Link from 'next/link';

export default function GoToCheckoutButton() {
  return (
    <Link href="http://examplestore-test.herokuapp.com/Checkout">
      <button data-test-id="cart-checkout">Go to checkout</button>
    </Link>
  );
}
