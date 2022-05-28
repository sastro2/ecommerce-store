import '../styles/globals.css';
import { useEffect, useState } from 'react';
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
    <BaseLayout>
      <Component {...pageProps} rerender={rerender} setRerender={setRerender} />
    </BaseLayout>
  );
}

export default MyApp;
