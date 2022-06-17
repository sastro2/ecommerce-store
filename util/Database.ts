import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';

config();

// for heroku const sql = postgres({ ssl: { rejectUnauthorized: false } });

const sql = postgres();

export async function getAllProducts() {
  const products = await sql<Product[]>`
      SELECT * FROM products
  `;

  return products;
}

export async function getFilteredProducts(input: string) {
  const products = await sql<Product[]>`
    SELECT * FROM products
    WHERE (LOWER(product_description)) like ${'%' + input + '%'}
    OR (LOWER(product_name)) like ${'%' + input + '%'}
    OR (LOWER(product_keywords)) like ${'%' + input + '%'}
  `;

  return products;
}

export async function getAllProductsForUserById(userId: number) {
  const products = await sql<Product[]>`
    SELECT * FROM products WHERE user_id = ${userId}
  `;

  return products;
}

export async function createProduct(
  productSlug: string,
  productName: string,
  productImgPath: string,
  productPrice: number,
  productDescription: string,
  productKeywords: string,
  userId: number,
) {
  await sql`
    INSERT INTO products
      (product_slug,
      product_name,
      product_imgpath,
      product_price,
      product_description,
      product_keywords,
      user_id)
    VALUES
      (${productSlug},
      ${productName},
      ${productImgPath},
      ${productPrice},
      ${productDescription},
      ${productKeywords},
      ${userId})
  `;
}

export async function updateProduct(
  productSlug: string,
  productName: string,
  productImgPath: string,
  productPrice: number,
  productDescription: string,
  productKeywords: string,
  productId: number,
) {
  await sql`
    UPDATE products
    SET
      product_slug = ${productSlug},
      product_name = ${productName},
      product_imgpath = ${productImgPath},
      product_price = ${productPrice},
      product_description = ${productDescription},
      product_keywords = ${productKeywords}
    WHERE
      id = ${productId}
  `;
}

export async function deleteProduct(id: number) {
  await sql`
      DELETE FROM
        products
      WHERE
				id = ${id}
	`;
}

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export async function getUserById(id: number) {
  const [user] = await sql<[User | undefined]>`
    SELECT
      id,
      username,
      role_id,
      first_name,
      last_name,
      email
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserByValidSessionToken(token: string | undefined) {
  if (!token) return undefined;
  const [user] = await sql<[User | undefined]>`
    SELECT
      users.id,
      users.username,
      users.role_id,
      users.first_name,
      users.last_name,
      users.email
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      sessions.user_id = users.id AND
      sessions.expiry_timestamp > now()
  `;
  return user && camelcaseKeys(user);
}

export async function getUserByUsername(username: string) {
  const [user] = await sql<[{ id: number } | undefined]>`
    SELECT
      id,
      role_id,
      first_name,
      last_name,
      email
     FROM users WHERE username = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function getUserWithPasswordHashByUsername(username: string) {
  const [user] = await sql<[UserWithPasswordHash | undefined]>`
    SELECT
      id,
      username,
      password_hash,
      role_id,
      first_name,
      last_name,
      email
    FROM
      users
    WHERE
      username = ${username}
  `;
  return user && camelcaseKeys(user);
}

export async function createUser(
  username: string,
  passwordHash: string,
  roleId: number,
) {
  const [user] = await sql<[User]>`
    INSERT INTO users
      (username, password_hash, role_id)
    VALUES
      (${username}, ${passwordHash}, ${roleId})
    RETURNING
      id,
      username
  `;
  return camelcaseKeys(user);
}

type Session = {
  id: number;
  token: string;
  userId: number;
};

export async function getValidSessionByToken(token: string | undefined) {
  if (!token) return undefined;
  const [session] = await sql<[Session | undefined]>`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${token} AND
      expiry_timestamp > now()
  `;

  await deleteExpiredSessions();

  return session && camelcaseKeys(session);
}

export async function createSession(token: string, userId: number) {
  const [session] = await sql<[Session]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING
      id,
      token
  `;

  await deleteExpiredSessions();

  return camelcaseKeys(session);
}

export async function deleteSessionByToken(token: string) {
  const [session] = await sql<[Session | undefined]>`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return session && camelcaseKeys(session);
}

export async function deleteExpiredSessions() {
  const sessions = await sql<Session[]>`
    DELETE FROM
      sessions
    WHERE
      expiry_timestamp < NOW()
    RETURNING *
  `;

  return sessions.map((session) => camelcaseKeys(session));
}

export type Order = {
  id: number;
  cart: string;
  userId: number;
};

export async function createOrder(cart: string, userId: number) {
  const [order] = await sql<[Order]>`
    INSERT INTO orders
      (cart, user_id)
    VALUES
      (${cart}, ${userId})
    RETURNING
      id,
      cart
  `;

  console.log('4');
  return order;
}

export async function getAllOrdersForUserById(userId: number) {
  const orders = await sql<Order[]>`
    SELECT cart FROM orders WHERE user_id = ${userId}
  `;

  return orders;
}
