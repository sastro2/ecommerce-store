import Head from 'next/head';
import Link from 'next/link';
import { productsDatabase } from '../util/Database';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>MY STORE</h1>
        <ul>
          {props.products.map((product) => {
            return (
              <li key={product.name}>
                <Link
                  href={`/${product.slug}`}
                  data-test-id={`product-${product.slug}`}
                >
                  <div>
                    imgPath: {product.imgPath}
                    Product name: {product.name}
                    Product description: {product.description}
                    Product price: {product.price}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export function getServerSideProps() {
  const rearrangedProducts = productsDatabase.sort(function () {
    return 0.5 - Math.random();
  });

  return {
    props: {
      products: rearrangedProducts,
    },
  };
}
