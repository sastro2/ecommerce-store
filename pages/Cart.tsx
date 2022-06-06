import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { GetAmountOfItemsInCart } from '../Components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { GetAllProducts } from '../util/Database';

type CartProps = {
  products: Product[];
  cart: CookieCartItem[];
  rerender: boolean;
  setRerender: (rerender: boolean) => void;
};

export const calculate = (
  localCartData: CookieCartItem[] | [],
  products: Product[],
  totalPriceCookieKey: string,
) => {
  let totalPrice = 0;

  for (let i = 0; i < localCartData.length; i++) {
    totalPrice =
      totalPrice +
      localCartData[i].amount *
        products[localCartData[i].itemId - 1].product_price;
  }

  if (totalPrice < 0) {
    return 'Total price can not be negative';
  }

  if (typeof window !== 'undefined') {
    setStringifiedCookie(totalPriceCookieKey, totalPrice);
  }

  return totalPrice;
};

export default function Cart(props: CartProps) {
  const [localCartData, setLocalCartData] = useState(props.cart);

  const handleAmountOfItem = useRef<HTMLSelectElement>(null);

  const totalPriceCookieKey = 'currentTotalPrice';
  const cartCookieKey = 'cart';
  let currentItem;
  let currentAmount: number;

  useEffect(() => {
    setLocalCartData(
      Cookies.get(cartCookieKey) ? getParsedCookie(cartCookieKey) : [],
    );
  }, [props.rerender]);

  console.log(props.products);

  const calculateTotalPrice = () => {
    const totalPrice = calculate(
      localCartData,
      props.products,
      totalPriceCookieKey,
    );

    return totalPrice;
  };

  const RemoveItem = (item: CookieCartItem) => {
    const currentCart = getParsedCookie(cartCookieKey);
    const newCart = currentCart.filter((i: CookieCartItem) => {
      return i.itemId !== item.itemId;
    });
    setLocalCartData(newCart);
    setStringifiedCookie(cartCookieKey, newCart);
    GetAmountOfItemsInCart();
    props.setRerender(!props.rerender);
  };

  const ChangeCurrentAmount = (item: CookieCartItem) => {
    if (handleAmountOfItem.current?.value) {
      currentAmount = parseInt(handleAmountOfItem.current.value);
      const currentCart = getParsedCookie(cartCookieKey);
      const newCart = currentCart.map((i: CookieCartItem) => {
        const foundProduct: Product | undefined = props.products.find((x) => {
          return x.id === item.itemId;
        });
        const foundProductId: number = foundProduct ? foundProduct.id : -1;
        if (i.itemId === foundProductId) {
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
  };

  if (localCartData.length !== 0) {
    return (
      <main>
        <Container>
          <Row>
            <Col md={9}>
              <Card>
                <ul>
                  {localCartData.map((item) => {
                    currentItem = props.products.find(
                      (product) => product.id === item.itemId,
                    );
                    if (currentItem) {
                      return (
                        <article
                          key={`cartItem-${item.itemId}`}
                          data-test-id={`cart-product-${currentItem.product_slug}`}
                        >
                          <div>
                            <h1>{currentItem.product_name}</h1>
                            <button
                              data-test-id={`cart-product-remove-${currentItem.product_slug}`}
                              onClick={() => RemoveItem(item)}
                            >
                              Remove
                            </button>
                          </div>
                          <div>
                            <p>
                              Amount:{' '}
                              <select
                                ref={handleAmountOfItem}
                                onChange={() => ChangeCurrentAmount(item)}
                                defaultValue={item.amount.toString()}
                                data-test-id={`cart-product-quantity-${currentItem.product_slug}`}
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
                            </p>
                            <p>Price: {currentItem.product_price}</p>
                          </div>
                        </article>
                      );
                    } else {
                      return null;
                    }
                  })}
                </ul>
              </Card>
            </Col>
            <Col md={3}>
              {' '}
              <Card>
                <Card.Body>
                  <Card.Title data-test-id="cart-total">
                    Total price: {calculateTotalPrice()}
                  </Card.Title>
                  <Button
                    data-test-id="cart-checkout"
                    href="https://examplestore-test.herokuapp.com/Checkout"
                  >
                    Go to checkout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    );
  } else {
    return (
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3rem',
        }}
      >
        There are no items in your cart :C
      </h1>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const currentCart = JSON.parse(context.req.cookies.cart || '[]');
  const products = await GetAllProducts();

  return {
    props: {
      products: products,
      cart: currentCart,
    },
  };
}
