exports.up = async (sql) => {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(30) NOT NULL UNIQUE,
      password_hash varchar(60) NOT NULL,
      role_id integer REFERENCES roles (id),
      first_name varchar(30),
      last_name varchar(30),
      email varchar(30)
    );
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE users
  `;
};
