import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getUserById, User } from '../../../util/Database';

type Props = {
  user?: User;
};

export default function UserDetail(props: Props) {
  if (!props.user) {
    return <h1>User not found</h1>;
  }

  return (
    <h1>
      Hello {props.user.username} this profile page doesnt do anything yet! :C
    </h1>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ user?: User }>> {
  const userId = context.query.userId;

  if (!userId || Array.isArray(userId)) {
    return { props: {} };
  }

  const user = await getUserById(parseInt(userId));

  if (!user) {
    context.res.statusCode = 404;
    return {
      props: {},
    };
  }

  return {
    props: {
      user: user,
    },
  };
}
