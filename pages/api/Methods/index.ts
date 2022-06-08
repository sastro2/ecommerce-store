import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.json({
    Checkout: 'https://examplestore-test.herokuapp.com/api/Methods/Checkout',
  });
}
