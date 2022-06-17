import { serialize } from 'cookie';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { deleteSessionByToken } from '../../util/Database';

export default function Logout() {
  return (
    <Head>
      <title>Logout</title>
      <meta name="Logout" />
    </Head>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token) {
    await deleteSessionByToken(token);

    context.res.setHeader(
      'Set-Cookie',
      serialize('sessionToken', '', {
        maxAge: -1,
        path: '/',
      }),
    );
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
