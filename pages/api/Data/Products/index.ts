import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.json({
    GetAllProducts:
      'https://examplestore-test.herokuapp.com/api/Data/Products/GetAllProducts',
    GetFilteredProducts:
      'https://examplestore-test.herokuapp.com/api/Data/Products/GetFilteredProducts',
  });
}
