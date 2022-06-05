import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <SSRProvider>
      <BaseLayout rerender={rerender} setRerender={setRerender}>
        <Component
          {...pageProps}
          rerender={rerender}
          setRerender={setRerender}
        />
      </BaseLayout>
    </SSRProvider>
  );
}

export default MyApp;
