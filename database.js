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

const deleteIngredient = attributes => {
  const sql = `
    UPDATE
      ingredients
    SET
      is_active=false
    WHERE
      id=$1
    RETURNING
      *
  `
  return db.one( sql, attributes )
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

const deleteDrink = attributes => {
  const sql = `
    UPDATE
      drinks
    SET
      is_active=false
    WHERE
      id=$1
    RETURNING
      *
  `
  return db.one( sql, attributes )
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

const deletePizza = attributes => {
  const sql = `
    UPDATE
      pizzas
    SET
      is_active=false
    WHERE
      id=$1
    RETURNING
      *
  `
  return db.one( sql, attributes )
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

const createMenuPizza = attributes => {
  const sql1 = `
    INSERT INTO pizzas
      (name)
    VALUES
      ( $1 )
    RETURNING
      id
  `
  return db.one( sql1, [attributes.name]);
}

const addToPizzaIngredients = (pizza_id, attributes) => {
  const sql2 = `
    INSERT INTO ingredients_pizzas
      (ingredient_id, pizza_id)
    VALUES
      ( $2, $1 ),
      ( $3, $1 ),
      ( $4, $1 )
    RETURNING
      *
  `
  const variables = [ pizza_id,
    attributes.ingredient1, attributes.ingredient2, attributes.ingredient3
  ]
  return db.any( sql2, variables )
}

const updatePizza = attributes => {
  const sql = `
    UPDATE
      pizzas
    SET
      name=$1
    WHERE
      id=$2
    RETURNING
      *
    `
  return db.one(sql, [attributes.name, attributes.pizza_id ])
}

const updatePizzaIngredients = attributes => {
  const sqlChange = `
    UPDATE
      ingredients_pizzas
    SET
      ingredient_id=$1
    WHERE
      ingredient_id=$2 AND pizza_id=$3
    RETURNING
      *
  `
  const variables = [ attributes.new_ingredient_id, attributes.old_ingredient_id, attributes.pizza_id ]
  return db.any( sqlChange, variables )
}

const getPizzaIngredients = attributes => {
  const sql = `
    SELECT
     *
    FROM
     ingredients
    INNER JOIN
     ingredients_pizzas
    ON
     ingredients.id = ingredients_pizzas.ingredient_id
    WHERE
     ingredients_pizzas.pizza_id = $1
  `
  return db.any( sql, attributes.id )
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
  createCustomer: createCustomer,
  getCustomerByUserName: getCustomerByUserName,
  getCustomerById: getCustomerById,
  getAllCustomers: getAllCustomers,
  updateCustomer: updateCustomer,
  deleteCustomer: deleteCustomer,
  getAllIngredients: getAllIngredients,
  deleteIngredient: deleteIngredient,
  getIngredientById: getIngredientById,
  updateIngredient: updateIngredient,
  createIngredient: createIngredient,
  getAllDrinks: getAllDrinks,
  getDrinkById: getDrinkById,
  updateDrink: updateDrink,
  deleteDrink: deleteDrink,
  createDrink: createDrink,
  getAllPizzas: getAllPizzas,
  getMenuPizzas: getMenuPizzas,
  updatePizza: updatePizza,
  updatePizzaIngredients: updatePizzaIngredients,
  createMenuPizza: createMenuPizza,
  addToPizzaIngredients: addToPizzaIngredients,
  getPizzaById: getPizzaById,
  deletePizza: deletePizza,
  getAllTransactions: getAllTransactions,
  getTransactionById: getTransactionById,
  deleteTransaction: deleteTransaction,
  getPizzaIngredients: getPizzaIngredients,
  createNewTransactionForCustomer: createNewTransactionForCustomer,
  addPizzaToTransaction: addPizzaToTransaction,
  addDrinkToTransaction: addDrinkToTransaction,
  getTransactionsForCustomer, getTransactionsForCustomer,
  getMostRecentTransactionForCustomer: getMostRecentTransactionForCustomer
}
