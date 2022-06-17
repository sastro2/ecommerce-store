import { css } from '@emotion/react';
import Link from 'next/link';

const buttonStyle = css``;

export default function GoToCheckoutButton() {
  return (
    <Link href="https://luzon-store.herokuapp.com/Checkout">
      <button css={buttonStyle} data-test-id="cart-checkout">
        Go to checkout
      </button>
    </Link>
  );
}
