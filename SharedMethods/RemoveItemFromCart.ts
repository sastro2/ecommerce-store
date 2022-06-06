import { GetAmountOfItemsInCart } from '../Components/Layout';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';

type RemoveItemsFromCartProps = {
  rerender: boolean;
  setRerender: (rerender: boolean) => void;
};

export default function RemoveItemsFromCart(
  props: RemoveItemsFromCartProps,
  item: CookieCartItem,
  cartCookieKey: string,
) {
  const currentCart = getParsedCookie(cartCookieKey);
  const newCart = currentCart.filter((i: CookieCartItem) => {
    return i.itemId !== item.itemId;
  });
  setStringifiedCookie(cartCookieKey, newCart);
  GetAmountOfItemsInCart();
  props.setRerender(!props.rerender);
}
