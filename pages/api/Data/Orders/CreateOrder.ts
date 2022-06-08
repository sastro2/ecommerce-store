import { NextApiRequest, NextApiResponse } from 'next';
import { createOrder, Order } from '../../../../util/Database';

export type OrderRequestBody = {
  cart: string;
  userId: number;
};

type OrderNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: OrderRequestBody;
};

export type OrderResponseBody =
  | { errors: { message: string }[] }
  | { order: Order };

export default async function createOrderHandler(
  request: OrderNextApiRequest,
  response: NextApiResponse<OrderResponseBody>,
) {
  if (request.method !== 'POST') {
    response.status(410).json({
      errors: [
        {
          message: 'Method invalid try POST',
        },
      ],
    });
  }

  const order = await createOrder(request.body.cart, request.body.userId);

  response.status(201).json({ order: order });
}
