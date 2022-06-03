import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createCsrfToken } from '../../util/auth';
import { getValidSessionByToken } from '../../util/Database';
import { LoginResponseBody } from '../api/Authentication/Login';

type Errors = {
  message: string;
}[];

type LoginPageProps = {
  refreshUserProfile: () => void;
  userObject: { username: string };
  csrfToken: string;
};

export default function Login(props: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);

  const router = useRouter();

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const loginResponse = await fetch('/api/Authentication/Login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
              csrfToken: props.csrfToken,
            }),
          });

          const loginResponseBody =
            (await loginResponse.json()) as LoginResponseBody;

          if ('errors' in loginResponseBody) {
            setErrors(loginResponseBody.errors);
            return;
          }

          const returnTo = router.query.returnTo;
          console.log('returnTo', returnTo);

          if (
            returnTo &&
            !Array.isArray(returnTo) &&
            /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
          ) {
            await router.push(returnTo);
            return;
          }

          props.refreshUserProfile();
          await router.push(`/`);
        }}
      >
        <label>
          Username:{' '}
          <input
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </label>
        <label>
          Password:{' '}
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button>Login</button>
      </form>
      <div>
        {errors.map((error) => {
          return <div key={`error-${error.message}`}>{error.message}</div>;
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;

  if (token) {
    const session = await getValidSessionByToken(token);

    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }
  return {
    props: {
      csrfToken: createCsrfToken(),
    },
  };
}
