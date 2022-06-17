import Head from 'next/head';
import { setStringifiedCookie } from '../../util/cookies';

export default function Success() {
  setStringifiedCookie('cart', []);

  return (
    <>
      <meta name="Checkout with Stripe!" />
      <Head>
        <title>Thank you for your order</title>
        <meta name="Thank you for your order" />
      </Head>
      <h1>Thank you for your order</h1>
    </>
  );
}
