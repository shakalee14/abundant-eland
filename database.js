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

const getAllCustomers = () => {
  const sql = `
    SELECT
      *
    FROM
      customers
  `
  return db.any( sql )
}

const getAllIngredients = () => {
  const sql = `
    SELECT
      *
    FROM
      ingredients
  `
  return db.any( sql )
}

const getIngredientById = attributes => {
  const sql = `
    SELECT
      *
    FROM
      ingredients
    WHERE
      id=$1
    LIMIT 1
  `
  return db.one( sql, attributes.id )
}

const createIngredient = attributes => {
  const sql = `
    INSERT INTO ingredients
      (name, description, type, price)
    VALUES
      ($1, $2, $3, $4)
    RETURNING
      *
   `
   const variables = [
     attributes.name, attributes.description, attributes.type, attributes.price ];

   return db.none( sql, variables );
}

const getAllDrinks = () => {
  const sql = `
    SELECT
      *
    FROM
      drinks
  `
  return db.any( sql )
}

const getDrinkById= attributes => {
  const sql = `
    SELECT
      *
    FROM
      drinks
    WHERE
      id=$1
    LIMIT 1
  `
  return db.one( sql, attributes.id )
}

const getAllPizzas = () => {
  const sql = `
    SELECT
      *
    FROM
      pizzas
  `
  return db.any( sql )
}

const getPizzaById = attributes => {
  const sql = `
    SELECT
      *
    FROM
      pizzas
    WHERE
      id=$1
    LIMIT 1
  `
  return db.one( sql, attributes.id )
}

const getAllTransactions = () => {
  const sql = `
    SELECT
      *
    FROM
      transactions
  `
  return db.any( sql )
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

module.exports = {
  createCustomer: createCustomer,
  getCustomerByUserName: getCustomerByUserName,
  getCustomerById: getCustomerById,
  getAllCustomers: getAllCustomers,
  getAllIngredients: getAllIngredients,
  getIngredientById: getIngredientById,
  createIngredient: createIngredient,
  getAllDrinks: getAllDrinks,
  getDrinkById: getDrinkById,
  getAllPizzas: getAllPizzas,
  getPizzaById: getPizzaById,
  getAllTransactions: getAllTransactions,
  getTransactionById: getTransactionById
}
