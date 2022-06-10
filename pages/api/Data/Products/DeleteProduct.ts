import { NextApiRequest, NextApiResponse } from 'next';
import { deleteProduct } from '../../../../util/Database';

type DeleteProductRequestBody = {
  productId: number;
};

type DeleteProductNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: DeleteProductRequestBody;
};

export default async function createProductHandler(
  request: DeleteProductNextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    await deleteProduct(request.body.productId);

    response
      .status(200)
      .json(`deleted product with id: ${request.body.productId}`);
    return;
  }
  response.status(405).json('Method not supported try POST');
}
