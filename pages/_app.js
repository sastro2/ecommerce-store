import '../styles/globals.css';
import BaseLayout from '../Components/Layout';

function MyApp({ Component, pageProps }) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}

export default MyApp;
