const users = [
  {
    username: 'Sascha',
    password_hash:
      '$2a$12$KwEYOL1jppbvvMXwY7IBDuzc3DUhYvEOkJj/SV3LMhHQOpzH.q3Wq',
    role_id: 1,
  },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO users ${sql(users, 'username', 'password_hash', 'role_id')}
  `;
};

exports.down = async (sql) => {
  for (const user of users) {
    await sql`
      DELETE FROM
        users
      WHERE
        username = ${user.username} AND
				password_hash = ${user.password_hash} AND
				role_id = ${user.role_id}
    `;
  }
};
