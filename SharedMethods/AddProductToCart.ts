import Cookies from 'js-cookie';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';

export const AddProductToCart = (
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
