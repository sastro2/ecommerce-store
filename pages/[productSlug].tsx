import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Button, Card, Col, Container, Offcanvas, Row } from 'react-bootstrap';
import { GetAmountOfItemsInCart } from '../Components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { GetAllProducts } from '../util/Database';

export const addProductToCart = (
  currentAmount: number,
  cartCookieKey: string,
  product: Product | null,
) => {
  let newCart: CookieCartItem[] = [];

  if (product) {
    const currentCart: CookieCartItem[] = Cookies.get(cartCookieKey)
      ? getParsedCookie(cartCookieKey)
      : [];
    const itemInCookie: CookieCartItem | undefined = currentCart.find(
      (item: CookieCartItem) => {
        return item.itemId === product.id;
      },
    );

    if (itemInCookie) {
      newCart = currentCart.map((item: CookieCartItem) => {
        if (item.itemId === product.id) {
          return { itemId: item.itemId, amount: item.amount + currentAmount };
        } else {
          return item;
        }
      });
    } else {
      if (currentAmount > 0) {
        newCart = [
          ...currentCart,
          { itemId: product.id, amount: currentAmount },
        ];
      }
    }
  }
  console.log(newCart);
  setStringifiedCookie(cartCookieKey, newCart);
};

const cartCookieKey: string = 'cart';
let currentAmount: number = 1;

const handleAddToCartClick = (props: ProductPageProps) => {
  addProductToCart(currentAmount, cartCookieKey, props.product);
  GetAmountOfItemsInCart();
  props.setRerender(!props.rerender);
};

export default function Product(props: ProductPageProps) {
  const handleAmountOfItem = useRef<HTMLSelectElement>(null);

  const ChangeCurrentAmount = () => {
    if (handleAmountOfItem.current?.value) {
      currentAmount = parseInt(handleAmountOfItem.current.value);
    }
  };

  if (props.product !== null) {
    return (
      <main>
        <section>
          <Container>
            <Row>
              <Col lg={9}>
                <Image
                  src={props.product.product_imgpath}
                  width="810"
                  height="614"
                  className="mt-xs-5 mt-lg-3"
                />
              </Col>
              <Col lg={3}>
                <Card className="mt-xs-2 mt-lg-5 ml-lg-3">
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
                    <OffCanvasExample {...props} />
                    <p>{props.product.product_description}</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    );
  } else {
    return <h1>Could not find page</h1>;
  }
}

function OffCanvasExample(props: ProductPageProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="primary"
        data-test-id="product-add-to-cart"
        onClick={() => {
          handleAddToCartClick(props);
          handleShow();
        }}
      >
        Add to Cart
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        name="cartSlide"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Your cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Show full cart here in the future
          <Button
            href="http://examplestore-test.herokuapp.com/Cart"
            variant="secondary"
          >
            Go to Cart
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
