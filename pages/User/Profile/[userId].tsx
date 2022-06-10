import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Tab,
  Tabs,
} from 'react-bootstrap';
import ConfirmPasswordModal, {
  confirmPasswordHandleShow,
} from '../../../Components/ConfirmPasswordModal';
import EditProductModal, {
  editHandleShow,
} from '../../../Components/EditProductModal';
import {
  getAllOrdersForUserById,
  getAllProducts,
  getAllProductsForUserById,
  getUserByValidSessionToken,
} from '../../../util/Database';

export default function UserDetail(props: ProfilePageProps) {
  if (!props.user) {
    return (
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3rem',
        }}
      >
        User not found
      </h1>
    );
  }

  if (props.confirmedSession === false) {
    return (
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3rem',
        }}
      >
        Session expired
      </h1>
    );
  }

  if (props.user.roleId === 1) {
    return (
      <>
        <ConfirmPasswordModal {...props} />
        <EditProductModal {...props} />
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="profile" title="Your Profile">
            <Container>
              <Row>
                <Col xl={5}>
                  <Container>
                    <Row>
                      <Col md={8}>
                        <Card className="bg-dark text-white">
                          <Card.Img
                            src="/Images/generic_profile_image.png"
                            alt="Card image"
                          />
                          <Card.ImgOverlay>
                            <Row>
                              <Col xs={3}>
                                <Button className="bg-light border-dark">
                                  <Image src="/Images/edit_icon.png" fluid />
                                </Button>
                              </Col>
                              <Col xs={9} />
                            </Row>
                          </Card.ImgOverlay>
                        </Card>
                      </Col>
                      <Col md={4} />
                      <Col md={8}>
                        <Card>
                          <Card.Body>
                            <Card.Title>
                              <h1
                                style={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                {props.user.username}
                              </h1>
                            </Card.Title>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={4} />
                    </Row>
                  </Container>
                </Col>
                <Col xl={6} style={{ marginTop: '20px' }}>
                  <Card>
                    <Card.Header
                      as="h5"
                      className="d-flex justify-content-between align-items-center"
                    >
                      Personal data
                      <Button>Edit</Button>
                    </Card.Header>
                    <Card.Body>
                      <p>First name: {props.user.firstName}</p>
                      <p>Last name: {props.user.lastName}</p>
                      <p>Email: {props.user.email}</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Tab>
          <Tab eventKey="orders" title="Recent Orders">
            {props.orders?.map((order) => {
              return order.map((cartItem) => {
                return (
                  <Card key={cartItem.itemId}>
                    <Card.Body>
                      <p>
                        {
                          props.products?.find((product) => {
                            return cartItem.itemId === product.id;
                          })?.product_name
                        }{' '}
                        and {order.length - 1} more items{' '}
                        <Button>View order</Button>
                      </p>
                    </Card.Body>
                  </Card>
                );
              });
            })}
          </Tab>
          <Tab eventKey="admin" title="Admin">
            <Row>
              <Col xs={1} sm={3} lg={4} />
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Create a product</Card.Title>
                    <Card.Text>
                      Create and customize your own products to sell to your
                      customers!
                    </Card.Text>
                    <Card.Footer>
                      <Button
                        variant="info"
                        href="https://luzon-store.herokuapp.com/User/Profile/Create"
                      >
                        Get started
                      </Button>
                    </Card.Footer>
                  </Card.Body>
                </Card>
              </Col>
              <Col xs={1} sm={3} lg={4} />
            </Row>
          </Tab>
          <Tab eventKey="myProducts" title="My Products">
            <Container>
              <Row>
                {props.userMadeProducts?.map((product) => {
                  return (
                    <Col key={product.id} style={{ marginTop: '20px' }} md={4}>
                      <Card
                        style={{
                          height: '100%',
                        }}
                      >
                        <Card.Img variant="top" src={product.product_imgpath} />
                        <Card.Body>
                          <Card.Title>{product.product_name}</Card.Title>
                          <Card.Text>
                            {product.product_description}{' '}
                            {product.product_price}
                          </Card.Text>
                          <Button
                            variant="info"
                            href={`/${product.product_slug}`}
                            data-test-id={`product-${product.product_slug}`}
                          >
                            Go to product
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() =>
                              editHandleShow(
                                {
                                  rerender: props.rerender,
                                  setRerender: props.setRerender,
                                },
                                product,
                              )
                            }
                          >
                            Edit product
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() =>
                              confirmPasswordHandleShow(
                                {
                                  rerender: props.rerender,
                                  setRerender: props.setRerender,
                                },
                                product,
                              )
                            }
                          >
                            Delete product
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Tab>
        </Tabs>
      </>
    );
  }

  return (
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="profile" title="Your Profile">
        <Container>
          <Row>
            <Col xl={5}>
              <Container>
                <Row>
                  <Col md={8}>
                    <Card className="bg-dark text-white">
                      <Card.Img
                        src="/Images/generic_profile_image.png"
                        alt="Card image"
                      />
                      <Card.ImgOverlay>
                        <Row>
                          <Col xs={3}>
                            <Button className="bg-light border-dark">
                              <Image src="/Images/edit_icon.png" fluid />
                            </Button>
                          </Col>
                          <Col xs={9} />
                        </Row>
                      </Card.ImgOverlay>
                    </Card>
                  </Col>
                  <Col md={4} />
                  <Col md={8}>
                    <Card>
                      <Card.Body>
                        <Card.Title>
                          <h1
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            {props.user.username}
                          </h1>
                        </Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4} />
                </Row>
              </Container>
            </Col>
            <Col xl={6} style={{ marginTop: '20px' }}>
              <Card>
                <Card.Header as="h5">Personal data</Card.Header>
                <Card.Body>
                  <p>First name: {props.user.firstName}</p>
                  <p>Last name: {props.user.lastName}</p>
                  <p>Email: {props.user.email}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="orders" title="Recent Orders">
        {props.orders?.map((order) => {
          return order.map((cartItem) => {
            return (
              <Card key={cartItem.itemId}>
                <Card.Body>
                  <p>
                    {
                      props.products?.find((product) => {
                        return cartItem.itemId === product.id;
                      })?.product_name
                    }{' '}
                    and {order.length - 1} more items{' '}
                    <Button>View order</Button>
                  </p>
                </Card.Body>
              </Card>
            );
          });
        })}
      </Tab>
    </Tabs>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<{
    user?: User;
    confirmedSession?: boolean;
    orders?: CookieCartItem[][];
    products?: Product[];
    userMadeProducts?: Product[];
  }>
> {
  const userId = context.query.userId;
  const session = context.req.cookies.sessionToken;

  if (!userId || Array.isArray(userId)) {
    return { props: {} };
  }

  if (!session) {
    return {
      props: {},
    };
  }

  const user = await getUserByValidSessionToken(session);

  if (!user) {
    return {
      props: {
        confirmedSession: false,
      },
    };
  }

  if (!(user.id === parseInt(userId))) {
    return {
      props: {
        confirmedSession: false,
      },
    };
  }

  const orders = await getAllOrdersForUserById(parseInt(userId));
  const parsedOrder: CookieCartItem[][] = orders.map((order) => {
    return JSON.parse(order.cart);
  });
  const allProducts: Product[] = await getAllProducts();
  const userMadeProducts: Product[] = await getAllProductsForUserById(user.id);

  return {
    props: {
      user: user,
      orders: parsedOrder,
      products: allProducts,
      userMadeProducts: userMadeProducts,
    },
  };
}
