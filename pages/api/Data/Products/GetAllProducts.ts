import { NextApiRequest, NextApiResponse } from 'next';
import { GetAllProducts } from '../../../../util/Database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
    const products = await GetAllProducts();

    response.send(products);
  }
}
