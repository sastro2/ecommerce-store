import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.json({
    Data: 'https://luzon-store.herokuapp.com/api/Data',
    Methods: 'https://luzon-store.herokuapp.com/api/Methods',
  });
}
