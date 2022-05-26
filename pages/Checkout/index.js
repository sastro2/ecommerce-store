import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';

export function Checkout() {
  const stripeInstance = useStripe();
  const elements = useElements();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAdress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripeInstance || !elements) {
      return;
    }
    const { error } = await stripeInstance.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/Checkout/success',
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={firstName}
        onChange={(event) => setFirstName(event.target.value)}
        placeholder="First name"
        name="firstName"
        data-test-id="checkout-first-name"
        required
      />
      <input
        value={lastName}
        onChange={(event) => setLastName(event.target.value)}
        placeholder="Last name"
        name="lastName"
        data-test-id="checkout-last-name"
        required
      />
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email adress"
        name="email"
        data-test-id="checkout-email"
        required
      />
      <input
        value={adress}
        onChange={(event) => setAdress(event.target.value)}
        placeholder="Adress"
        name="adress"
        data-test-id="checkout-address"
        required
      />
      <input
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="City"
        name="city"
        data-test-id="checkout-city"
        required
      />
      <input
        value={postalCode}
        onChange={(event) => setPostalCode(event.target.value)}
        placeholder="Postal code"
        name="postalCode"
        data-test-id="checkout-postal-code"
        required
      />
      <input
        value={country}
        onChange={(event) => setCountry(event.target.value)}
        placeholder="Country"
        name="country"
        data-test-id="checkout-country"
        required
      />
      <PaymentElement>
        <CardNumberElement ata-test-id="checkout-credit-card">
          card number element
        </CardNumberElement>
        <CardExpiryElement data-test-id="checkout-expiration-date">
          card expiry element
        </CardExpiryElement>
        <CardCvcElement data-test-id="checkout-security-code">
          card cvc element
        </CardCvcElement>
      </PaymentElement>
      <button data-test-id="checkout-confirm-order" disabled={!stripeInstance}>
        Confirm Order
      </button>
    </form>
  );
}

const stripePromise = loadStripe(
  'pk_test_51L3KVWFLsAebFWQrIRBHE9ox07fzYVNP2K9rV7RqoPU7i5Ml364smadXmng6CkiOjPDfQTDf56M50AfDmYHWVRvA00Oyzogt5B',
);

export default function Wrapper(props) {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    async function CreatePaymentIntent() {
      await fetch('http://localhost:3000/api/Methods/Checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientSecret(data.clientSecret);
        });
    }
    CreatePaymentIntent().catch(() =>
      console.log('Could not create Payment Intent'),
    );
  }, []);

  if (!clientSecret) {
    return <h1>LOADING</h1>;
  }

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <Checkout {...props} />
    </Elements>
  );
}
