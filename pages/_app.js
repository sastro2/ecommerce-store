import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCallback, useEffect, useState } from 'react';
import { SSRProvider } from 'react-bootstrap';
import BaseLayout, { GetAmountOfItemsInCart } from '../Components/Layout';

function Rerender(state) {
  return {
    rerender: !state.rerender,
  };
}

function MyApp({ Component, pageProps }) {
  const [rerender, setRerender] = useState(false);
  const [user, setUser] = useState();

  const refreshUserProfile = useCallback(async () => {
    const response = await fetch('/api/Authentication/GetProfile');
    const data = await response.json();

    if ('errors' in data) {
      setUser(undefined);
      return;
    }

    setUser(data.user);
  }, []);

  useEffect(() => {
    refreshUserProfile().catch(() => {});
  }, [refreshUserProfile]);

  useEffect(() => {
    GetAmountOfItemsInCart();
    setRerender(Rerender);
  }, []);

  return (
    <SSRProvider>
      <BaseLayout
        rerender={rerender}
        setRerender={setRerender}
        userObject={user}
        refreshUserProfile={refreshUserProfile}
      >
        <Component
          {...pageProps}
          rerender={rerender}
          setRerender={setRerender}
          userObject={user}
          refreshUserProfile={refreshUserProfile}
        />
      </BaseLayout>
    </SSRProvider>
  );
}

export default MyApp;
