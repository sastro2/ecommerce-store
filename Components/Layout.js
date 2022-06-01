import { css } from '@emotion/react';
import Cookies from 'js.cookie';
import { useRef, useState } from 'react';
import {
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { getParsedCookie } from '../util/cookies';
import SearchPage from './SearchPage';

const baseNavbarStyle = css`
  display: flex;
`;

const cartCookieKey = 'cart';
let amountOfItemsInCart;
let productsToDisplay;

export const GetAmountOfItemsInCart = () => {
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

  const handleSearchbar = useRef();

  const HandleSearchbarInput = async () => {
    const currentInput = handleSearchbar.current.value;
    const response = await fetch(
      `http://localhost:3000/api/Data/Products/GetFilteredProducts?searchInput=${currentInput}`,
    );
    productsToDisplay = await response.json();
    setSearching(true);
    props.setRerender(!props.rerender);
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark" css={baseNavbarStyle}>
        <Container>
          <Navbar.Brand href="#home">Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                href="http://localhost:3000/"
                data-test-id="products-link"
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="http://localhost:3000/Cart"
                data-test-id="cart-count"
              >
                Cart: {amountOfItemsInCart}
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onKeyDown={HandleSearchbarInput}
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
      <footer>Copyright n stuff</footer>
    </>
  );
}
