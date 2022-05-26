import GoToCheckoutButton from '../Components/GoToCheckoutButton';
import { productsDatabase } from '../util/Database';

export const localCartData = [
  {
    itemID: 1,
    ammountOfItemInCart: 2,
  },
  {
    itemID: 2,
    ammountOfItemInCart: 2,
  },
  {
    itemID: 4,
    ammountOfItemInCart: 2,
  },
  {
    itemID: 8,
    ammountOfItemInCart: 2,
  },
];

export default function Cart(props) {
  let currentItem;

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    for (let i = 0; i < localCartData.length; i++) {
      totalPrice =
        totalPrice +
        localCartData[i].ammountOfItemInCart *
          props.products[localCartData[i].itemID].price;
    }

    if (totalPrice < 0) {
      return 'Total price can not be negative';
    }

    return totalPrice;
  };

  return (
    <main>
      <ul>
        {localCartData.map((item) => {
          currentItem = props.products.find((x) => x.id === item.itemID);
          return (
            <article
              key={`cartItem-${item.itemID}`}
              data-test-id="cart-product-<product id>"
            >
              <h2>Product name: {currentItem.name}</h2>
              <p>Price: {currentItem.price}</p>
              <p data-test-id="cart-product-quantity-<product id>">
                Amount: {item.ammountOfItemInCart}
              </p>
            </article>
          );
        })}
      </ul>
      <h2 data-test-id="cart-total">Total price: {calculateTotalPrice()}</h2>
      <GoToCheckoutButton />
    </main>
  );
}

export function getServerSideProps() {
  const allProducts = productsDatabase;

  return {
    props: {
      products: allProducts,
    },
  };
}
