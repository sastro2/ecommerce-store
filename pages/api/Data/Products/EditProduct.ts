import { NextApiRequest, NextApiResponse } from 'next';
import { updateProduct } from '../../../../util/Database';

type EditProductRequestBody = {
  productSlug: string;
  productName: string;
  productImgPath: string;
  productPrice: number;
  productDescription: string;
  productKeywords: string;
  userId: number;
};

type EditProductNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: EditProductRequestBody;
};

export default async function editProductHandler(
  request: EditProductNextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.productSlug !== 'string' ||
      typeof request.body.productName !== 'string' ||
      typeof request.body.productImgPath !== 'string' ||
      typeof request.body.productPrice !== 'number' ||
      typeof request.body.productDescription !== 'string' ||
      typeof request.body.productKeywords !== 'string'
    ) {
      response.send(
        'Input must be of type string except for price which must be a number',
      );
    }
    await updateProduct(
      request.body.productSlug,
      request.body.productName,
      request.body.productImgPath,
      request.body.productPrice,
      request.body.productDescription,
      request.body.productKeywords,
      request.body.userId,
    );

    response.send(`edited product ${request.body.productName}`);
  }
}
