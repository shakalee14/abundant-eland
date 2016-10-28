const databaseName = 'pizzastore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')();
const db = pgp( connectionString );
const bcrypt = require('bcrypt-nodejs');

const getAllTransactions = () => {
  const sql = `
    SELECT
      *
    FROM
      transactions
  `
  return db.any( sql )
}

const createNewTransactionForCustomer = attributes => {
  const sql = `
    INSERT INTO transactions
      ( customer_id, price_total, order_date )
    VALUES
      ( $1, $2, CURRENT_TIMESTAMP )
    RETURNING
     *
  `
  const variables = [ attributes.customer_id, attributes.price_total ]
  return db.one( sql, variables )
}

const getMostRecentTransactionForCustomer = attributes => {
  const sql = `
    SELECT * FROM transactions
    WHERE customer_id = $1
    ORDER BY order_date DESC
    LIMIT 1
  `
  return db.one( sql, [ attributes.id ])
}

const addDrinkToTransaction = (attributes, transaction_id) => {
  const sql = `
    INSERT INTO drink_transactions
      ( drink_id, transaction_id, amount )
    VALUES
      ( $2, $1, $3),
      ( $4, $1, $5)
    RETURNING
      *
  `
  const variables = [ transaction_id, attributes.drink_id1, attributes.drink_number, attributes.drink_id2, attributes.drink_number2 ]

  return db.any( sql, variables )
}

const addPizzaToTransaction = ( attributes, transaction_id ) => {
  const sql = `
    INSERT INTO pizza_transactions
      ( pizza_id, transaction_id, amount )
    VALUES
      ( $2, $1, $3),
      ( $4, $1, $5)
    RETURNING
      *
  `
  const variables = [ transaction_id, attributes.pizza_id1, attributes.pizza_number, attributes.pizza_id2, attributes.pizza_number2 ]

  return db.any( sql, variables )
}

const getTransactionById = attributes => {
  const sql = `
    SELECT
      *
    FROM
      transactions
    WHERE
      id=$1
    LIMIT 1
  `
  return db.one( sql, attributes.id )
}

const getTransactionDrinksById = attributes => {
  const sql = `
    SELECT
      *
    FROM
      drinks
    INNER JOIN
      drink_transactions
    ON
      drinks.id = drink_transactions.drink_id
    WHERE
      drink_transactions.transaction_id = $1
  `
  return db.any( sql, [ attributes.id ])
}

const getTransactionPizzasById = attributes => {
  const sql = `
    SELECT
      *
    FROM
      pizzas
    INNER JOIN
      pizza_transactions
    ON
      pizzas.id = pizza_transactions.pizza_id
    WHERE
      pizza_transactions.transaction_id = $1
  `
  return db.any( sql, [ attributes.id ])
}

const getCustomerInfoByTransactionId = attributes => {
  const sql = `
    SELECT
      name, address, phone_number
    FROM
      customers
    INNER JOIN
      transactions
    ON
      customers.id = transactions.customer_id
    WHERE
      transactions.id = $1
  `
  return db.any( sql, [ attributes.id ])
}

const getTransactionsForCustomer = attributes => {
  const sql = `
    SELECT
      *
    FROM
      transactions
    WHERE
      customer_id=$1
  `
  return db.any( sql, [attributes.id] )
}

const deleteTransaction = attributes => {
  const sql = `
    UPDATE
      transactions
    SET
      is_active = false
    WHERE
      id= $1
    RETURNING
      *
  `
  return db.one( sql, attributes )
}

module.exports = {
  getAllTransactions: getAllTransactions,
  createNewTransactionForCustomer: createNewTransactionForCustomer,
  getMostRecentTransactionForCustomer: getMostRecentTransactionForCustomer,
  addDrinkToTransaction: addDrinkToTransaction,
  addPizzaToTransaction: addPizzaToTransaction,
  getTransactionById: getTransactionById,
  getTransactionDrinksById: getTransactionDrinksById,
  getTransactionPizzasById: getTransactionPizzasById,
  getCustomerInfoByTransactionId: getCustomerInfoByTransactionId,
  getTransactionsForCustomer: getTransactionsForCustomer,
  deleteTransaction: deleteTransaction
}