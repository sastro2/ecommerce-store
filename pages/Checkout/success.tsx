import Head from 'next/head';
import { setStringifiedCookie } from '../../util/cookies';

export default function Success() {
  setStringifiedCookie('cart', []);

  return (
    <>
      <Head>
        <title>Thank you for your order</title>
        <meta
          name="Thank you for your order"
          content="Congratulations your item is now being delivered to you!"
        />
      </Head>
      <h1>Thank you for your order</h1>
    </>
  );
}
