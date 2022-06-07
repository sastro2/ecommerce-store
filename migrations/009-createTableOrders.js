exports.up = async (sql) => {
  await sql`
  CREATE TABLE orders (
		id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
		cart varchar(20000),
		user_id integer REFERENCES users (id) ON DELETE CASCADE
	);
	`;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE orders
  `;
};
