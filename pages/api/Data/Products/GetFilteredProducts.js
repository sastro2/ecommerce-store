import { GetFilteredProducts } from '../../../../util/Database';

export default async function handler(request, response) {
  if (request.method === 'GET') {
    const products = await GetFilteredProducts(
      request.query.searchInput.toLowerCase(),
    );

    response.send(products);
  }
}
