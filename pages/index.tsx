import Head from 'next/head';
import { useState } from 'react';
import {
  Button,
  Card,
  Carousel,
  Col,
  Container,
  Image,
  Pagination,
  Row,
} from 'react-bootstrap';
import { GetAllProducts } from '../util/Database';

type IndexProps = {
  productsToDisplay: Product[];
};

export default function Home(props: IndexProps) {
  const [activePage, setActivePage] = useState(1);

  const pages = [];
  const pageAmount = Math.ceil(props.productsToDisplay.length / 9);
  const productsForPage = props.productsToDisplay.filter((product) => {
    return (
      1 + 9 * (activePage - 1) === product.id ||
      2 + 9 * (activePage - 1) === product.id ||
      3 + 9 * (activePage - 1) === product.id ||
      4 + 9 * (activePage - 1) === product.id ||
      5 + 9 * (activePage - 1) === product.id ||
      6 + 9 * (activePage - 1) === product.id ||
      7 + 9 * (activePage - 1) === product.id ||
      8 + 9 * (activePage - 1) === product.id ||
      9 + 9 * (activePage - 1) === product.id
    );
  });

  const handlePagination = (page: number) => {
    setActivePage(page);
  };

  for (let i = 1; i <= pageAmount; i++) {
    pages.push(
      <Pagination.Item
        onClick={() => handlePagination(i)}
        key={i}
        active={i === activePage}
      >
        {i}
      </Pagination.Item>,
    );
  }

  return (
    <div>
      <Head>
        <title>Luzon.com</title>
        <meta
          name="Luzon.com"
          content="If you can want it you can buy it on Luzon"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Carousel variant="dark" className="bg-info">
          <Carousel.Item>
            <Row>
              <Col xs={1} />
              <Col xs={10}>
                <Image
                  className="d-block m-auto"
                  src="/Images/P50-Pro-black.png"
                  alt="First slide"
                  fluid
                />
              </Col>
              <Col xs={1} />
            </Row>
            <Carousel.Caption>
              <Button variant="dark">Electronics</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col xs={1} />
              <Col xs={10}>
                <Image
                  className="d-block m-auto"
                  src="/Images/shoes.png"
                  alt="Second slide"
                  fluid
                />
              </Col>
              <Col xs={1} />
            </Row>

            <Carousel.Caption>
              <Button variant="dark">Shoes</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <Row>
              <Col xs={1} />
              <Col xs={10}>
                <Image
                  className="d-block m-auto"
                  src="/Images/doggo.png"
                  alt="Third slide"
                  fluid
                />
              </Col>
              <Col xs={1} />
            </Row>

            <Carousel.Caption>
              <Button variant="dark">Doggos</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        <Container>
          <Row>
            {productsForPage.map((product) => {
              return (
                <Col
                  key={product.product_name}
                  style={{ marginTop: '20px' }}
                  md={4}
                >
                  <Card
                    style={{
                      height: '100%',
                    }}
                  >
                    <Card.Img variant="top" src={product.product_imgpath} />
                    <Card.Body>
                      <Card.Title>{product.product_name}</Card.Title>
                      <Card.Text>
                        {product.product_description} {product.product_price}
                      </Card.Text>
                      <Button
                        variant="primary"
                        href={`/${product.product_slug}`}
                        data-test-id={`product-${product.product_slug}`}
                      >
                        Go to product
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>

        <Container className="d-flex justify-content-center mt-3">
          <Pagination>{pages}</Pagination>
        </Container>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const products = await GetAllProducts();

  return {
    props: {
      productsToDisplay: products,
    },
  };
}
