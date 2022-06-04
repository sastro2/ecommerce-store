exports.up = async (sql) => {
  await sql`
    CREATE TABLE products (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
			product_slug varchar(25) NOT NULL,
      product_name varchar(40) NOT NULL,
      product_imgpath varchar(1000) NOT NULL,
      product_price integer NOT NULL,
      product_description varchar(1000) NOT NULL
    );
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE products
  `;
};
