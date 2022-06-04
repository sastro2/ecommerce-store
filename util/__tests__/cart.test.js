import { expect } from '@playwright/test';
import { addProductToCart } from '../../pages/[productSlug].tsx';
import { calculate } from '../../pages/Cart.tsx';
import { getParsedCookie } from '../cookies.ts';

const testItems = [
  {
    id: 1,
    product_slug: '1',
    product_name: '1',
    product_imgpath: '1',
    product_price: 1,
    product_description: '1',
  },
  {
    id: 2,
    product_slug: '2',
    product_name: '2',
    product_imgpath: '2',
    product_price: 2,
    product_description: '2',
  },
];
const testCart = [
  { itemId: 1, amount: 1 },
  { itemId: 2, amount: 1 },
];

test('updating quantity in item of cookie', () => {
  const currentAmount = 3;
  const cartCookieKey = 'testCart';

  expect(() =>
    addProductToCart(currentAmount, cartCookieKey, testItems[0]),
  ).not.toThrow();
  expect(() =>
    addProductToCart(currentAmount, cartCookieKey, testItems[0]),
  ).not.toThrow();

  expect(getParsedCookie(cartCookieKey)).toStrictEqual([
    { amount: 6, itemId: 1 },
  ]);
});

test('calculate total price of cart items', () => {
  const totalPriceCookieKey = 'testPrice';

  expect(calculate(testCart, testItems, totalPriceCookieKey)).toEqual(3);
});
