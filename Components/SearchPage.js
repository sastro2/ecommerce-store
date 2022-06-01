import { Button } from 'react-bootstrap';

export default function SearchPage(props) {
  console.log(props.productsToDisplay);
  return props.productsToDisplay.map((product) => {
    return (
      <section key={product.id}>
        <h1>name: {product.product_name}</h1>
        <h2>price: {product.product_price}</h2>
        <div>description: {product.product_description}</div>
        <Button
          variant="primary"
          href={`/${product.product_slug}`}
          data-test-id={`product-${product.product_slug}`}
        >
          Go to product
        </Button>
      </section>
    );
  });
}
