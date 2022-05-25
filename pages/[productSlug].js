import { productsDatabase } from '../util/Database';

export default function Product(props) {
  return (
    <main>
      <h1>name: {props.product.name}</h1>
      <p>IMAGE</p>
      <p data-test-id="product-price">price: {props.product.price}</p>
      <p>description: {props.product.description}</p>
    </main>
  );
}

export function getServerSideProps(context) {
  const foundProduct = productsDatabase.find((product) => {
    return product.slug === context.query.productSlug;
  });

  return {
    props: {
      product: foundProduct,
    },
  };
}
