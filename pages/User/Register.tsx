import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { createCsrfToken } from '../../util/auth';
import { setStringifiedCookieWithOptions } from '../../util/cookies';
import { getValidSessionByToken } from '../../util/Database';
import { RegisterResponseBody } from '../api/Authentication/Register';

type Errors = { message: string }[];

type RegisterPageProps = {
  csrfToken: string;
};

export default function Register(props: RegisterPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  let userId: number;

  const router = useRouter();

  const isLoggedInCookieKey = 'loggedIn';

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Luzon.com" />
      </Head>
      <div>
        <Container>
          <Row>
            <Col />
            <Col md={8} lg={7} xl={6}>
              <Card style={{ marginTop: '5rem' }}>
                <Card.Body>
                  <Card.Title>Register</Card.Title>
                  <Form
                    onSubmit={async (event) => {
                      event.preventDefault();
                      const registerResponse = await fetch(
                        '/api/Authentication/Register',
                        {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            username: username,
                            password: password,
                            csrfToken: props.csrfToken,
                          }),
                        },
                      );

                      const registerResponseBody =
                        (await registerResponse.json()) as RegisterResponseBody;

                      if ('errors' in registerResponseBody) {
                        setErrors(registerResponseBody.errors);
                        return;
                      }

                      if ('user' in registerResponseBody) {
                        userId = registerResponseBody.user.id;
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
                      console.log(userId);

                      setStringifiedCookieWithOptions(
                        isLoggedInCookieKey,
                        [
                          {
                            isLoggedIn: true,
                            user: userId,
                          },
                        ],
                        {
                          expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
                        },
                      );
                      await router.push(`/`);
                    }}
                  >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        placeholder="Enter username"
                        onChange={(event) =>
                          setUsername(event.currentTarget.value)
                        }
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter assword"
                        onChange={(event) =>
                          setPassword(event.currentTarget.value)
                        }
                      />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Register
                    </Button>
                  </Form>
                  <div>
                    {errors.map((error) => {
                      return (
                        <div key={`error-${error.message}`}>
                          {error.message}
                        </div>
                      );
                    })}
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col />
          </Row>
        </Container>
      </div>
    </>
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
