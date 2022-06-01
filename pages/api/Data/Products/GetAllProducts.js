import { GetAllProducts } from '../../../../util/Database';

export default async function handler(request, response) {
  if (request.method === 'GET') {
    const products = await GetAllProducts();

    response.send(products);
  }
}
