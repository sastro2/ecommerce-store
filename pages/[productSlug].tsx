import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRef } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import CartOffCanvas, { handleShow } from '../Components/CartOffCanvas';
import { GetAmountOfItemsInCart } from '../Components/Layout';
import { AddProductToCart } from '../SharedMethods/AddProductToCart';
import { getAllProducts } from '../util/Database';

const cartCookieKey: string = 'cart';
let currentAmount: number = 1;

const handleAddToCartClick = (props: ProductPageProps) => {
  AddProductToCart(currentAmount, cartCookieKey, props.product);
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
      <>
        <Head>
          <title>{props.product.product_name}</title>
          <meta name={props.product.product_name} content="Luzon.com" />
        </Head>
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
                      <Button
                        variant="primary"
                        data-test-id="product-add-to-cart"
                        onClick={() => {
                          handleAddToCartClick(props);
                          handleShow(props);
                        }}
                      >
                        Add to Cart
                      </Button>
                      <CartOffCanvas {...props} />
                      <p>{props.product.product_description}</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      </>
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
        Could not find page
      </h1>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const products = await getAllProducts();
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
      products: products,
      product: foundProduct,
    },
  };
}
