// eslint-disable-next-line @typescript-eslint/naming-convention
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query(
  'SELECT table_schema,table_name FROM information_schema.tables;',
  (err, res) => {
    if (err) throw err;
    // eslint-disable-next-line prefer-const
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  },
);

const options = {};

if (process.env.NODE_ENV === 'production') {
  options.ssl = { rejectUnauthorized: false };
}

module.exports = options;
