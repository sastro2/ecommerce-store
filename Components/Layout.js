import Link from 'next/link';

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
          </li>
        </nav>
      </header>
      {props.children}
      <footer>Copyright n stuff</footer>
    </div>
  );
}
