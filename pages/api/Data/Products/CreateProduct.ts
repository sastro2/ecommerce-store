import { NextApiRequest, NextApiResponse } from 'next';
import { createProduct } from '../../../../util/Database';

type CreateProductRequestBody = {
  productSlug: string;
  productName: string;
  productImgPath: string;
  productPrice: number;
  productDescription: string;
  productKeywords: string;
  userId: number;
};

type CreateProductNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: CreateProductRequestBody;
};

export default async function createProductHandler(
  request: CreateProductNextApiRequest,
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
    await createProduct(
      request.body.productSlug,
      request.body.productName,
      request.body.productImgPath,
      request.body.productPrice,
      request.body.productDescription,
      request.body.productKeywords,
      request.body.userId,
    );

    response.send(`created product ${request.body.productName}`);
  }
}
