import Image from 'next/image';
import Link from 'next/link';
import { productsDatabase } from '../util/Database';

export default function Product(props) {
  const CharCheck = (e) => {
    if (
      (e.keyCode >= 48 && e.keyCode <= 57) ||
      e.keyCode === 8 ||
      (e.keyCode >= 37 && e.keyCode <= 40)
    ) {
      return;
    } else {
      e.preventDefault();
    }
  };

  return (
    <main>
      <h1>name: {props.product.name}</h1>
      <Image src={props.product.imgPath} width="600" height="400" />
      <p data-test-id="product-price">price: {props.product.price}</p>
      <p>description: {props.product.description}</p>
      <select data-test-id="product-quantity">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <label htmlFor="customAmountInput">Custom Amount</label>
      <input
        name="customAmountInput"
        type="number"
        min="0"
        placeholder="eg. 10"
        onKeyDown={CharCheck}
      />
      <button data-test-id="product-add-to-cart">Add to Cart</button>
      <Link href="http://localhost:3000/Cart">
        <button>Go to Cart</button>
      </Link>
    </main>
  );
}

export function getServerSideProps(context) {
  const foundProduct = productsDatabase.find((product) => {
    return product.slug === context.query.productSlug;
  });

  return {
    props: {
      product: foundProduct,
    },
  };
}
