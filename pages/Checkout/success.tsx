import Head from 'next/head';
import { setStringifiedCookie } from '../../util/cookies';

export default function Success() {
  setStringifiedCookie('cart', []);

  return (
    <>
      <Head>
        <title>Thank you for your order</title>
        <meta name="description" content="Luzon.com" />
      </Head>
      <h1>Thank you for your order</h1>
    </>
  );
}
