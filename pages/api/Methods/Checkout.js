const stripe = require('stripe')(
  'sk_test_51L3KVWFLsAebFWQri6qZ0ubFOVGfD0IBjuy6WkgaJSTETPYGDLy6qKAcpjlCiIK6MUBtzMCGOPF63b8OWpijCyQp00LdYHWZnB',
);

export default function handler(request, response) {
  async function CreatePaymentIntent() {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: request.body.amount,
        currency: 'eur',
        payment_method_types: ['card'],
      });

      response.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      console.log(error);
    }
  }
  CreatePaymentIntent().catch(() =>
    console.log('failed to create payment intent'),
  );
}
