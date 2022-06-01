import { css } from '@emotion/react';
import Cookies from 'js.cookie';
import { useEffect, useRef, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { GetAmountOfItemsInCart } from '../Components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { GetAllProducts } from '../util/Database';

const baseCartStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 75px;
  margin-left: 350px;
  margin-right: 350px;
`;

const productContainerStyle = css`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
  border: 0.5px solid gray;
  border-radius: 5px;
`;

const productNameStyle = css`
  margin-right: 350px;
`;

export default function Cart(props) {
  const [localCartData, setLocalCartData] = useState(props.cart);

  const handleAmountOfItem = useRef([]);

  const totalPriceCookieKey = 'currentTotalPrice';
  const cartCookieKey = 'cart';
  let currentItem;
  let currentAmount;

  useEffect(() => {
    console.log('hi');
    setLocalCartData(
      Cookies.get(cartCookieKey) ? getParsedCookie(cartCookieKey) : [],
    );
  }, [props.rerender]);

  console.log(props.products);

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (let i = 0; i < localCartData.length; i++) {
      totalPrice =
        totalPrice +
        localCartData[i].amount *
          props.products[localCartData[i].itemId - 1].product_price;
    }

    if (totalPrice < 0) {
      return 'Total price can not be negative';
    }

    if (typeof window !== 'undefined') {
      setStringifiedCookie(totalPriceCookieKey, totalPrice);
    }

    return totalPrice;
  };

  const RemoveItem = (item) => {
    const currentCart = getParsedCookie(cartCookieKey);
    const newCart = currentCart.filter((i) => {
      return i.itemId !== item.itemId;
    });
    setLocalCartData(newCart);
    setStringifiedCookie(cartCookieKey, newCart);
    GetAmountOfItemsInCart();
    props.setRerender(!props.rerender);
  };

  const ChangeCurrentAmount = (item) => {
    if (handleAmountOfItem.current.value !== 'customAmount') {
      currentAmount = parseInt(handleAmountOfItem.current[item.itemId].value);
      const currentCart = getParsedCookie(cartCookieKey);
      const newCart = currentCart.map((i) => {
        if (
          i.itemId ===
          props.products.find((x) => {
            return x.id === item.itemId;
          }).id
        ) {
          return { itemId: i.itemId, amount: currentAmount };
        } else {
          return i;
        }
      });
      console.log(newCart);
      setStringifiedCookie(cartCookieKey, newCart);
      GetAmountOfItemsInCart();
      props.setRerender(!props.rerender);
    }
    if (handleAmountOfItem.current.value === 'customAmount') {
      currentAmount = handleAmountOfItem.current.value;
    }
  };

  return (
    <main css={baseCartStyle}>
      <ul>
        {localCartData.map((item) => {
          currentItem = props.products.find(
            (product) => product.id === item.itemId,
          );
          return (
            <article
              key={`cartItem-${item.itemId}`}
              data-test-id={`cart-product-${currentItem.product_slug}`}
              css={productContainerStyle}
            >
              <div css={productNameStyle}>
                <h1>{currentItem.product_name}</h1>
                <button
                  data-test-id={`cart-product-remove-${currentItem.product_slug}`}
                  onClick={() => RemoveItem(item)}
                >
                  Remove
                </button>
              </div>
              <div>
                <p
                  data-test-id={`cart-product-quantity-${currentItem.product_slug}`}
                >
                  Amount:{' '}
                  <select
                    ref={(element) => {
                      handleAmountOfItem.current[item.itemId] = element;
                    }}
                    onChange={() => ChangeCurrentAmount(item)}
                    defaultValue={item.amount.toString()}
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
                    <option value="customAmount">Custom Amount</option>
                  </select>
                </p>
                <p>Price: {currentItem.product_price}</p>
              </div>
            </article>
          );
        })}
      </ul>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title data-test-id="cart-total">
            Total price: {calculateTotalPrice()}
          </Card.Title>
          <Button
            data-test-id="cart-checkout"
            href="http://localhost:3000/Checkout"
          >
            Go to checkout
          </Button>
        </Card.Body>
      </Card>
    </main>
  );
}

export async function getServerSideProps(context) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');
  const products = await GetAllProducts();

  return {
    props: {
      products: products,
      cart: currentCart,
    },
  };
}
