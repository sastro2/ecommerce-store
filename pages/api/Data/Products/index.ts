import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.json({
    GetAllProducts: 'http://localhost:3000/api/Data/Products/GetAllProducts',
    GetFilteredProducts:
      'http://localhost:3000/api/Data/Products/GetFilteredProducts',
  });
}
