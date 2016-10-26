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
  //const query = db.one( sql1, attributes.name)
  return db.one( sql1, [attributes.name]);

  // return Promise.all( query )
  // .then( results => {
  //   const pizza_id = results.id;
  //
  //   return Promise.all( db.addToPizzaIngredients( pizza_id, attributes ) ).then(() => result)
  // });
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
  return db.one( sql2, variables )
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
  createMenuPizza: createMenuPizza,
  addToPizzaIngredients: addToPizzaIngredients,
  getPizzaById: getPizzaById,
  deletePizza: deletePizza,
  getAllTransactions: getAllTransactions,
  getTransactionById: getTransactionById,
  deleteTransaction: deleteTransaction
}
