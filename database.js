const databaseName = 'pizzastore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')();
const db = pgp( connectionString );
const bcrypt = require('bcrypt-nodejs');

const createCustomer = attributes => {
  const sql = `
    INSERT INTO customers
      (name, user_name, password, address, phone_number, payment_method)
    VALUES
      ($1, $2, $3, $4, $5, $6)
    RETURNING
      *
   `
   const password = bcrypt.hashSync(attributes.password);

   const variables = [
     attributes.name, attributes.user_name, password, attributes.address, attributes.phone_number, attributes.payment_method ];

   return db.one(sql, variables);
}

const getCustomer = attributes => {
  const sql = `
    SELECT
      *
    FROM
      customers
    WHERE
      user_name=$1
    LIMIT 1
  `
  return db.one( sql, attributes.user_name)
}

module.exports = { createCustomer: createCustomer, getCustomer: getCustomer }
