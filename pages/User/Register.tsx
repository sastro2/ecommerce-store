import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { createCsrfToken } from '../../util/auth';
import { getValidSessionByToken } from '../../util/Database';
import { RegisterResponseBody } from '../api/Authentication/Register';

type Errors = { message: string }[];

type RegisterPageProps = {
  refreshUserProfile: () => void;
  userObject: { username: string };
  csrfToken: string;
};

export default function Register(props: RegisterPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);

  const router = useRouter();

  return (
    <div>
      <h1>Register</h1>
      <form
        onSubmit={async (event) => {
          event.preventDefault();

          const registerResponse = await fetch('/api/Authentication/Register', {
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

          const registerResponseBody =
            (await registerResponse.json()) as RegisterResponseBody;

          if ('errors' in registerResponseBody) {
            setErrors(registerResponseBody.errors);
            return;
          }

          props.refreshUserProfile();
          await router.push('/');
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
        <button>Register</button>
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
