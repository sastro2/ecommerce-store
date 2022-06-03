import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.json({
    Data: 'http://localhost:3000/api/Data',
    Methods: 'http://localhost:3000/api/Methods',
  });
}
