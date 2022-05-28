import Cookies from 'js.cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { GetAmountOfItemsInCart } from '../Components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { productsDatabase } from '../util/Database';

export default function Product(props) {
  const handleAmountOfItem = useRef([]);

  const cartCookieKey = 'cart';
  let currentAmount = 1;

  // const CharCheck = (e) => {
  // if (
  // (e.keyCode >= 48 && e.keyCode <= 57) ||
  // e.keyCode === 8 ||
  // (e.keyCode >= 37 && e.keyCode <= 40)
  // ) {
  // return;
  // } else {
  // e.preventDefault();
  // }
  // };

  const AddProductToCart = () => {
    let newCart;
    const currentCart = Cookies.get(cartCookieKey)
      ? getParsedCookie(cartCookieKey)
      : [];
    const itemInCookie = currentCart.find((item) => {
      return item.itemId === props.product.id;
    });

    if (itemInCookie) {
      newCart = currentCart.map((item) => {
        if (item.itemId === props.product.id) {
          return { itemId: item.itemId, amount: item.amount + currentAmount };
        } else {
          return item;
        }
      });
    } else {
      if (currentAmount > 0) {
        newCart = [
          ...currentCart,
          { itemId: props.product.id, amount: currentAmount },
        ];
      }
    }
    if (newCart) {
      setStringifiedCookie(cartCookieKey, newCart);
      GetAmountOfItemsInCart(props);
      props.setRerender(!props.rerender);
    }
  };

  const ChangeCurrentAmount = () => {
    console.log(handleAmountOfItem.current.value);
    currentAmount = parseInt(handleAmountOfItem.current.value);
  };

  return (
    <main>
      <h1>name: {props.product.name}</h1>
      <Image src={props.product.imgPath} width="600" height="400" />
      <p data-test-id="product-price">price: {props.product.price}</p>
      <p>description: {props.product.description}</p>
      <select
        data-test-id="product-quantity"
        ref={handleAmountOfItem}
        onChange={ChangeCurrentAmount}
        defaultValue="1"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      <button data-test-id="product-add-to-cart" onClick={AddProductToCart}>
        Add to Cart
      </button>
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
