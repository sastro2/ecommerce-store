import Cookies from 'js-cookie';
import { useEffect, useRef, useState } from 'react';
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import SearchPage from './SearchPage';

const cartCookieKey = 'cart';
let amountOfItemsInCart;
let productsToDisplay;

export const GetAmountOfItemsInCart = () => {
  console.log(getParsedCookie(cartCookieKey));
  const currentCart = Cookies.get(cartCookieKey)
    ? getParsedCookie(cartCookieKey)
    : [];
  const amount = currentCart.reduce((accumulator, i) => {
    return accumulator + i.amount;
  }, 0);
  amountOfItemsInCart = amount ? amount : 0;
};

export default function BaseLayout(props) {
  const [searching, setSearching] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState();

  const handleSearchbar = useRef();

  const loggedInCookie = getParsedCookie('loggedIn');

  useEffect(() => {
    if (loggedInCookie) {
      setLoggedIn(loggedInCookie[0].isLoggedIn);
      setUserId(loggedInCookie[0].user);
    }
  }, [loggedInCookie]);

  console.log(loggedInCookie, loggedIn, userId);

  const HandleSearchbarInput = async () => {
    const currentInput = handleSearchbar.current.value;
    const response = await fetch(
      `http://examplestore-test.herokuapp.com/api/Data/Products/GetFilteredProducts?searchInput=${currentInput}`,
    );
    productsToDisplay = await response.json();
    setSearching(true);
    props.setRerender(!props.rerender);
  };

  const handleLogout = () => {
    setStringifiedCookie('loggedIn', [{ isLoggedIn: false, user: 0 }]);
  };

  if (!loggedIn) {
    return (
      <>
        <Navbar
          bg="dark"
          expand="lg"
          variant="dark"
          style={{ display: 'flex' }}
        >
          <Container>
            <Navbar.Brand href="#home">Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link
                  href="http://examplestore-test.herokuapp.com/"
                  data-test-id="products-link"
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  href="http://examplestore-test.herokuapp.com/Cart"
                  data-test-id="cart-count"
                >
                  Cart: {amountOfItemsInCart}
                </Nav.Link>
                <NavDropdown title="User" id="basic-nav-dropdown">
                  <NavDropdown.Item href="http://examplestore-test.herokuapp.com/User/Login">
                    Log In
                  </NavDropdown.Item>
                  <NavDropdown.Item href="http://examplestore-test.herokuapp.com/User/Register">
                    Register
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  onChange={HandleSearchbarInput}
                  ref={handleSearchbar}
                />
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        {searching ? (
          <SearchPage productsToDisplay={productsToDisplay} />
        ) : (
          props.children
        )}
        <footer
          style={{
            background: 'grey',
            padding: '2rem',
          }}
        >
          Store 2022. All rights reserved lol
        </footer>
      </>
    );
  }

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" style={{ display: 'flex' }}>
        <Container>
          <Navbar.Brand href="#home">Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="http://examplestore-test.herokuapp.com/"
                data-test-id="products-link"
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="http://examplestore-test.herokuapp.com/Cart"
                data-test-id="cart-count"
              >
                Cart: {amountOfItemsInCart}
              </Nav.Link>
              <NavDropdown title="User" id="basic-nav-dropdown">
                <NavDropdown.Item
                  href={`http://examplestore-test.herokuapp.com/User/Profile/${userId}`}
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  href="http://examplestore-test.herokuapp.com/User/Logout"
                  onClick={handleLogout}
                >
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={HandleSearchbarInput}
                ref={handleSearchbar}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ paddingBottom: '2rem' }}>
        {searching ? (
          <SearchPage productsToDisplay={productsToDisplay} />
        ) : (
          props.children
        )}
      </div>
      <footer
        style={{
          background: 'grey',
          padding: '2rem',
        }}
      >
        Store 2022. All rights reserved lol
      </footer>
    </>
  );
}
