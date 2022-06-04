import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.json({
    Data: 'http://examplestore-test.herokuapp.com/api/Data',
    Methods: 'http://examplestore-test.herokuapp.com/api/Methods',
  });
}
