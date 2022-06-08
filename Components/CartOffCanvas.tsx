import Cookies from 'js-cookie';
import { useRef } from 'react';
import { Button, Card, Col, Container, Offcanvas, Row } from 'react-bootstrap';
import ChangeAmountOfItemInCart from '../SharedMethods/ChangeAmountOfItemInCart';
import RemoveItemsFromCart from '../SharedMethods/RemoveItemFromCart';
import { getParsedCookie } from '../util/cookies';

let showOffCanvas: boolean = false;

export const handleShow = (props: ProductPageProps) => {
  showOffCanvas = !showOffCanvas;
  props.setRerender(!props.rerender);
};

export default function CartOffCanvas(props: ProductPageProps) {
  const handleAmountOfItem = useRef<HTMLSelectElement[]>([]);

  const cartCookieKey = 'cart';

  const currentCart: CookieCartItem[] = Cookies.get(cartCookieKey)
    ? getParsedCookie(cartCookieKey)
    : [];

  return (
    <Offcanvas
      show={showOffCanvas}
      onHide={() => handleShow(props)}
      placement="end"
      name="cartSlide"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Your cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Button
          href="https://luzon-store.herokuapp.com/Cart"
          variant="secondary"
        >
          Go to Cart
        </Button>
        <Container>
          <Row>
            <Col>
              {currentCart.map((item) => {
                const currentItem = props.products.find((i) => {
                  return item.itemId === i.id;
                });
                if (currentItem) {
                  return (
                    <Card key={item.itemId}>
                      <Card.Img
                        variant="top"
                        src={currentItem.product_imgpath}
                      />
                      <Card.Body>
                        <Card.Title>{currentItem.product_name}</Card.Title>
                        <Card.Text>
                          {currentItem.product_description}{' '}
                          <select
                            ref={(element) =>
                              (handleAmountOfItem.current[item.itemId] =
                                element!)
                            }
                            onChange={() =>
                              ChangeAmountOfItemInCart(
                                {
                                  allProducts: props.products,
                                  rerender: props.rerender,
                                  setRerender: props.setRerender,
                                },
                                item,
                                handleAmountOfItem,
                                cartCookieKey,
                              )
                            }
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
                          <div>
                            <h1>{currentItem.product_name}</h1>
                            <button
                              onClick={() =>
                                RemoveItemsFromCart(
                                  {
                                    rerender: props.rerender,
                                    setRerender: props.setRerender,
                                  },
                                  item,
                                  cartCookieKey,
                                )
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  );
                } else {
                  return null;
                }
              })}
            </Col>
          </Row>
        </Container>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
