const databaseName = 'pizzastore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')();
const db = pgp( connectionString );
const bcrypt = require('bcrypt-nodejs');

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
      name IS NOT NULL and is_active = true
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

const deletePizzaPreference = attributes => {
  const sql = `
    DELETE FROM
      customers_pizzas
    WHERE
      customer_id=$1 AND pizza_id=$2`

  const variables = [ attributes.cid, attributes.pid ];
  return db.one( sql, variables )

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
  return db.any( sql, [ attributes.id ] )
}

module.exports = {
  getAllPizzas: getAllPizzas,
  getMenuPizzas: getMenuPizzas,
  deletePizza: deletePizza,
  deletePizzaPreference: deletePizzaPreference,
  getPizzaById: getPizzaById,
  createMenuPizza: createMenuPizza,
  addToPizzaIngredients: addToPizzaIngredients,
  updatePizza: updatePizza,
  updatePizzaIngredients: updatePizzaIngredients,
  getPizzaIngredients: getPizzaIngredients
}