export {};

declare global {
  type Product = {
    id: number;
    product_slug: string;
    product_name: string;
    product_imgpath: string;
    product_price: number;
    product_description: string;
  };

  type CookieCartItem = {
    itemId: number;
    amount: number;
  };
}
