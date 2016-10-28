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

   return db.one( sql, variables );
}

const getPreferencesForCustomer = attributes => {
  const sql = `
    SELECT
      *
    FROM
      pizzas
    INNER JOIN
      customers_pizzas
    ON
      pizzas.id = customers_pizzas.pizza_id
    WHERE
      customers_pizzas.customer_id = $1
  `
  return db.any( sql, [attributes.id] )
}

const addPizzaPreference = attributes => {
  const sql = `
    INSERT INTO customers_pizzas
      ( customer_id, pizza_id )
    VALUES
      ( $1, $2 )
    RETURNING
      *
  `
  const variables = [ attributes.cid, attributes.pid ]
  return db.any( sql, variables )
}

const updateCustomer = attributes => {
  const sql = `
    UPDATE
      customers
    SET
      name=$1, user_name=$2, password=$3, address=$4, phone_number=$5, payment_method=$6
    WHERE
      id=$7
    RETURNING
      *
  `
  const password = bcrypt.hashSync(attributes.password);

  const variables = [
    attributes.name, attributes.user_name, password, attributes.address, attributes.phone_number, attributes.payment_method, attributes.id ];

  return db.one( sql, variables )
}

const deleteCustomer = attributes => {
  const sql = `
    UPDATE
      customers
    SET
      is_active=false
    WHERE
      id=$1
    RETURNING
      *
  `
  return db.one( sql, attributes )
}

const getCustomerByUserName = attributes => {
  const sql = `
    SELECT
      *
    FROM
      customers
    WHERE
      user_name=$1
    LIMIT 1
  `
  return db.one( sql, attributes.user_name )
}

const checkCustomerUserName = attributes => {
  const sql = `
    SELECT
      count(*)
    FROM
      customers
    WHERE
      user_name=$1
  `
  return db.one(sql, [attributes.user_name])
}

const getCustomerById = attributes => {
  const sql = `
    SELECT
      *
    FROM
      customers
    WHERE
      id=$1
    LIMIT 1
  `
  return db.one( sql, attributes.id )
}

const getAllActiveCustomers = () => {
  const sql = `
    SELECT
      *
    FROM
      customers
    WHERE
      is_active = true
  `
  return db.any( sql )
}

const getAllCustomers = () => {
  const sql = `
    SELECT
      *
    FROM
      customers
  `
  return db.any( sql )
}

module.exports = {
  createCustomer: createCustomer,
  getPreferencesForCustomer: getPreferencesForCustomer,
  addPizzaPreference: addPizzaPreference,
  updateCustomer: updateCustomer,
  deleteCustomer: deleteCustomer,
  getCustomerByUserName: getCustomerByUserName,
  getCustomerById: getCustomerById,
  getAllActiveCustomers: getAllActiveCustomers,
  checkCustomerUserName: checkCustomerUserName,
  getAllCustomers: getAllCustomers
}