import { css } from '@emotion/react';
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
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import * as Yup from 'yup';
import { getParsedCookie } from '../../util/cookies';

const baseFormStyle = css`
  margin-top: 75px;
  margin-left: 450px;
  margin-right: 450px;
`;

export function Checkout() {
  const stripeInstance = useStripe();
  const elements = useElements();

  const totalPriceCookieKey = 'currentTotalPrice';

  const handlePayment = async () => {
    if (!stripeInstance || !elements) {
      return;
    }
    const { error } = await stripeInstance.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/Checkout/success',
      },
    });
    if (error.type === 'card_error' || error.type === 'validation_error') {
      alert(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      adress: '',
      city: '',
      postalCode: '',
      country: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      lastName: Yup.string()
        .max(20, 'Must be 16 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      adress: Yup.string()
        .matches(/[A-Za-z0-9'.\-\s,]/g, 'Must be a valid Adress')
        .required('Required'),
      city: Yup.string()
        .matches(
          /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/,
          'Must be a valid city',
        )
        .required('Required'),
      postalCode: Yup.string()
        .matches(/^[0-9]+$/, 'Must be a valid postal code')
        .required('Required'),
      country: Yup.string()
        .matches(/[a-zA-Z]{2,}/, 'Must be a valid country')
        .required('Required'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    formik.handleSubmit();
    await handlePayment();
  };

  return (
    <form onSubmit={handleSubmit} css={baseFormStyle}>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Personal data</Accordion.Header>
          <Accordion.Body>
            <input
              onChange={formik.handleChange}
              value={formik.values.firstName}
              onBlur={formik.handleBlur}
              placeholder="First name"
              id="firstName"
              name="firstName"
              data-test-id="checkout-first-name"
              required
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div>{formik.errors.firstName}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.lastName}
              onBlur={formik.handleBlur}
              placeholder="Last name"
              id="lastName"
              name="lastName"
              data-test-id="checkout-last-name"
              required
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div>{formik.errors.lastName}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
              placeholder="Email adress"
              id="email"
              name="email"
              data-test-id="checkout-email"
              required
            />
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.adress}
              onBlur={formik.handleBlur}
              placeholder="Adress"
              id="adress"
              name="adress"
              data-test-id="checkout-address"
              required
            />
            {formik.touched.adress && formik.errors.adress ? (
              <div>{formik.errors.adress}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.city}
              onBlur={formik.handleBlur}
              placeholder="City"
              id="city"
              name="city"
              data-test-id="checkout-city"
              required
            />
            {formik.touched.city && formik.errors.city ? (
              <div>{formik.errors.city}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.postalCode}
              onBlur={formik.handleBlur}
              placeholder="Postal code"
              id="postalCode"
              name="postalCode"
              data-test-id="checkout-postal-code"
              required
            />
            {formik.touched.postalCode && formik.errors.postalCode ? (
              <div>{formik.errors.postalCode}</div>
            ) : null}
            <input
              onChange={formik.handleChange}
              value={formik.values.country}
              onBlur={formik.handleBlur}
              placeholder="Country"
              id="country"
              name="country"
              data-test-id="checkout-country"
              required
            />
            {formik.touched.country && formik.errors.country ? (
              <div>{formik.errors.country}</div>
            ) : null}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Checkout with Stripe</Accordion.Header>
          <Accordion.Body>
            <h1>{getParsedCookie(totalPriceCookieKey)}€</h1>
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
            <button
              data-test-id="checkout-confirm-order"
              type="submit"
              disabled={!stripeInstance}
            >
              Confirm Order
            </button>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
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
