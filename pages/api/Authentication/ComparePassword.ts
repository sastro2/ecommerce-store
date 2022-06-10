import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { getUserWithPasswordHashByUsername } from '../../../util/Database';

type ComparePasswordRequestBody = {
  username: string;
  password: string;
};

type ComparePasswordNextApiRequest = Omit<NextApiRequest, 'body'> & {
  body: ComparePasswordRequestBody;
};

export type ComparePasswordResponseBody =
  | { errors: { message: string }[] }
  | { passwordMatches: boolean };

export default async function comparePasswordHandler(
  request: ComparePasswordNextApiRequest,
  response: NextApiResponse<ComparePasswordResponseBody>,
) {
  if (request.method === 'POST') {
    if (
      typeof request.body.password !== 'string' ||
      typeof request.body.username !== 'string'
    ) {
      response.status(400).json({
        errors: [
          {
            message: 'Username or password not provided',
          },
        ],
      });
      return;
    }

    const user = await getUserWithPasswordHashByUsername(request.body.username);

    if (!user) {
      response.status(440).json({
        errors: [
          {
            message: 'Session expired',
          },
        ],
      });
      return;
    }

    const doesPasswordMatch = await bcrypt.compare(
      request.body.password,
      user.passwordHash,
    );

    if (!doesPasswordMatch) {
      response.status(401).json({
        errors: [
          {
            message: 'Password incorrect',
          },
        ],
      });
      return;
    }

    response.status(201).json({
      passwordMatches: true,
    });
  }
}
