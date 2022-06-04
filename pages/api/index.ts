import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.json({
    Data: 'http://examplestore-test/api/Data',
    Methods: 'http://examplestore-test/api/Methods',
  });
}
