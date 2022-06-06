import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getUserByValidSessionToken, User } from '../../../util/Database';

type Props = {
  user?: User;
  confirmedSession?: boolean;
};

export default function UserDetail(props: Props) {
  if (props.confirmedSession === false) {
    return (
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3rem',
        }}
      >
        Session expired
      </h1>
    );
  }

  if (!props.user) {
    return (
      <h1
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3rem',
        }}
      >
        User not found
      </h1>
    );
  }

  return (
    <h1
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3rem',
      }}
    >
      Hello {props.user.username} this profile page doesnt do anything yet! :C
    </h1>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<{ user?: User; confirmedSession?: boolean }>
> {
  const userId = context.query.userId;
  const session = context.req.cookies.sessionToken;

  if (!userId || Array.isArray(userId)) {
    return { props: {} };
  }

  if (!session) {
    return {
      props: {},
    };
  }

  const user = await getUserByValidSessionToken(session);

  if (!user) {
    return {
      props: {
        confirmedSession: false,
      },
    };
  }

  if (!(user.id === parseInt(userId))) {
    return {
      props: {
        confirmedSession: false,
      },
    };
  }
  console.log('i passed the checks');
  return {
    props: {
      user: user,
    },
  };
}
