import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.json({
    Checkout: 'https://luzon-store.herokuapp.com/api/Data/Products',
  });
}
