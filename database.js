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
   return db.one( sql, variables );
}

const updateIngredient = attributes => {
  const sql = `
    UPDATE
      ingredients
    SET
      name=$1, description=$2, type=$3, price=$4
    WHERE
      id=$5
    RETURNING
      *
  `
  const variables = [
    attributes.name, attributes.description, attributes.type, attributes.price, attributes.id ];

  return db.one( sql, variables );
}

const createDrink = attributes => {
  const sql = `
    INSERT INTO drinks
      (name, description, manufacturer, supplier, price)
    VALUES
      ($1, $2, $3, $4, $5)
    RETURNING
      *
   `
   const variables = [
     attributes.name, attributes.description, attributes.manufacturer, attributes.supplier, attributes.price ];
   return db.one( sql, variables );
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

const updateDrink = attributes => {
  const sql = `
    UPDATE
      drinks
    SET
      name=$1, description=$2, manufacturer=$3, supplier=$4, price=$5
    WHERE
      id=$6
    RETURNING
      *
  `
  const variables = [
    attributes.name, attributes.description, attributes.manufacturer, attributes.supplier, attributes.price, attributes.id ];
  return db.one( sql, variables );
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

const getMenuPizzas = () => {
  const sql = `
    SELECT
      *
    FROM
      pizzas
    WHERE
      name IS NOT NULL
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
  updateCustomer: updateCustomer,
  getAllIngredients: getAllIngredients,
  getIngredientById: getIngredientById,
  updateIngredient: updateIngredient,
  createIngredient: createIngredient,
  getAllDrinks: getAllDrinks,
  getDrinkById: getDrinkById,
  updateDrink: updateDrink,
  createDrink: createDrink,
  getAllPizzas: getAllPizzas,
  getMenuPizzas: getMenuPizzas,
  getPizzaById: getPizzaById,
  getAllTransactions: getAllTransactions,
  getTransactionById: getTransactionById
}
