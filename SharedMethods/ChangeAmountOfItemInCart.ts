import { RefObject } from 'react';
import { GetAmountOfItemsInCart } from '../Components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';

type ChangeAmountOfItemInCartProps = {
  allProducts: Product[];
  rerender: boolean;
  setRerender: (rerender: boolean) => void;
};

export default function ChangeAmountOfItemInCart(
  props: ChangeAmountOfItemInCartProps,
  item: CookieCartItem,
  handleAmountOfItem: RefObject<HTMLSelectElement>,
  cartCookieKey: string,
) {
  let currentAmount: number;

  if (handleAmountOfItem.current?.value) {
    currentAmount = parseInt(handleAmountOfItem.current.value);
    const currentCart = getParsedCookie(cartCookieKey);
    const newCart = currentCart.map((i: CookieCartItem) => {
      const foundProduct = props.allProducts.find((x) => {
        return x.id === item.itemId;
      });
      const foundProductId = foundProduct ? foundProduct.id : -1;
      if (i.itemId === foundProductId) {
        return { itemId: i.itemId, amount: currentAmount };
      } else {
        return i;
      }
    });
    setStringifiedCookie(cartCookieKey, newCart);
    GetAmountOfItemsInCart();
    props.setRerender(!props.rerender);
  }
}
