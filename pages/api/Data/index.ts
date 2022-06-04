import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.json({
    Checkout: 'http://examplestore-test.herokuapp.com/api/Data/Products',
  });
}
