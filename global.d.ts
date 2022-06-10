export {};

declare global {
  export type User = {
    id: number;
    username: string;
    roleId: number;
    firstName: string;
    lastName: string;
    email: string;
  };

  type Product = {
    id: number;
    product_slug: string;
    product_name: string;
    product_imgpath: string;
    product_price: number;
    product_description: string;
    product_keywords: string;
    userId: number;
  };

  type CookieCartItem = {
    itemId: number;
    amount: number;
  };

  type ProductPageProps = {
    products: Product[];
    product: Product | null;
    rerender: boolean;
    setRerender: (rerender: boolean) => void;
  };

  type CreatePageProps = {
    userId?: number;
    roleId?: number;
    rerender: boolean;
    setRerender: (rerender: boolean) => void;
  };

  type ProfilePageProps = {
    user?: User;
    confirmedSession?: boolean;
    orders?: CookieCartItem[][];
    products?: Product[];
    userMadeProducts?: Product[];
    rerender: boolean;
    setRerender: (rerender: boolean) => void;
  };

  type ProfilePageModalProps = Omit<
    ProfilePageProps,
    'confirmedSession' | 'orders' | 'products' | 'userMadeProducts'
  >;

  type Errors = {
    message: string;
  }[];
}
