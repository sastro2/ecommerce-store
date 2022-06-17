import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { SSRProvider } from 'react-bootstrap';
import BaseLayout, { GetAmountOfItemsInCart } from '../Components/Layout';

function Rerender(state) {
  return {
    rerender: !state.rerender,
  };
}

function MyApp({ Component, pageProps }) {
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    GetAmountOfItemsInCart();
    setRerender(Rerender);
  }, []);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icon-apple-touch.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>Luzon.com</title>
        <meta name="description" content="Luzon.com" />
      </Head>
      <SSRProvider>
        <BaseLayout rerender={rerender} setRerender={setRerender}>
          <Component
            {...pageProps}
            rerender={rerender}
            setRerender={setRerender}
          />
        </BaseLayout>
      </SSRProvider>
    </>
  );
}

export default MyApp;
