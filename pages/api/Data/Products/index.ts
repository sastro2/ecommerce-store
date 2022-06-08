import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.json({
    GetAllProducts:
      'https://luzon-store.herokuapp.com/api/Data/Products/GetAllProducts',
    GetFilteredProducts:
      'https://luzon-store.herokuapp.com/api/Data/Products/GetFilteredProducts',
  });
}
