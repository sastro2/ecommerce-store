import { setStringifiedCookie } from '../../util/cookies';

export default function Success() {
  setStringifiedCookie('cart', []);

  return <h1>Thank you for your order</h1>;
}
