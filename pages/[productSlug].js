import { css } from '@emotion/react';
import Cookies from 'js.cookie';
import Image from 'next/image';
import { useRef } from 'react';
import { Button, Card } from 'react-bootstrap';
import { GetAmountOfItemsInCart } from '../Components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { GetAllProducts } from '../util/Database';

const baseProductSectionStyle = css`
  margin-top: 50px;
  display: flex;
  margin-left: 18%;
  margin-right: 18%;
  justify-content: space-between;
`;

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

  if (props.product !== null) {
    return (
      <main>
        <section css={baseProductSectionStyle}>
          <Image src={props.product.product_imgpath} width="810" height="614" />
          <Card style={{ width: '22rem' }}>
            <Card.Body>
              <Card.Title>
                <h1>{props.product.product_name}</h1>
              </Card.Title>
              <Card.Subtitle
                className="mb-2 text-muted"
                data-test-id="product-price"
              >
                {props.product.product_price}
              </Card.Subtitle>
              <Card.Text>
                <select
                  data-test-id="product-quantity"
                  ref={handleAmountOfItem}
                  onChange={ChangeCurrentAmount}
                  defaultValue="1"
                  placeholder="Qty"
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
              </Card.Text>
              <Button
                variant="primary"
                data-test-id="product-add-to-cart"
                onClick={AddProductToCart}
              >
                Add to Cart
              </Button>
              <Button href="http://localhost:3000/Cart" variant="secondary">
                Go to Cart
              </Button>
              <p>{props.product.product_description}</p>
            </Card.Body>
          </Card>
        </section>
      </main>
    );
  } else {
    return <h1>Could not find page</h1>;
  }
}

export async function getServerSideProps(context) {
  const products = await GetAllProducts();
  console.log(products);
  const foundProduct = products.find((product) => {
    return product.product_slug === context.query.productSlug;
  })
    ? products.find((product) => {
        return product.product_slug === context.query.productSlug;
      })
    : null;

  console.log(foundProduct);

  return {
    props: {
      product: foundProduct,
    },
  };
}
