import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.json({ Checkout: 'http://localhost:3000/api/Data/Products' });
}
