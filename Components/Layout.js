import Cookies from 'js.cookie';
import Link from 'next/link';
import { useEffect } from 'react';
import { getParsedCookie } from '../util/cookies';

const cartCookieKey = 'cart';
let amountOfItemsInCart;

export const GetAmountOfItemsInCart = () => {
  const currentCart = Cookies.get(cartCookieKey)
    ? getParsedCookie(cartCookieKey)
    : [];
  const amount = currentCart.reduce((accumulator, i) => {
    return accumulator + i.amount;
  }, 0);
  amountOfItemsInCart = amount ? amount : 0;
};

export default function BaseLayout(props) {
  return (
    <div>
      <header>
        <nav>
          <li>
            <Link href="http://localhost:3000/" data-test-id="products-link">
              Home
            </Link>
          </li>
          <li>
            <input placeholder="Searchbar" />
          </li>
          <li>
            <Link href="http://localhost:3000/Cart" data-test-id="cart-link">
              Cart
            </Link>
            <p data-test-id="cart-count">: {amountOfItemsInCart}</p>
          </li>
        </nav>
      </header>
      {props.children}
      <footer>Copyright n stuff</footer>
    </div>
  );
}
