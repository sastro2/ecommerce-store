import { NextApiRequest, NextApiResponse } from 'next';
import { GetFilteredProducts } from '../../../../util/Database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (
    request.method === 'GET' &&
    typeof request.query.searchInput === 'string'
  ) {
    const products = await GetFilteredProducts(
      request.query.searchInput.toLowerCase(),
    );

    response.send(products);
  }
}
