import { NextApiRequest, NextApiResponse } from 'next';
import { getAllProducts } from '../../../../util/Database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
    const products = await getAllProducts();

    response.send(products);
  }
}
