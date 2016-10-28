const databaseName = 'pizzastore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')();
const db = pgp( connectionString );
const bcrypt = require('bcrypt-nodejs');

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

const getAllActiveDrinks = () => {
  const sql = `
    SELECT
      *
    FROM
      drinks
    WHERE
      is_active = true
  `
  return db.any( sql )
}

const getAllActiveIngredients = () => {
  const sql = `
    SELECT
      *
    FROM
      ingredients
    WHERE
      is_active = true
  `
  return db.any( sql )
}

module.exports = {
  getMenuPizzas: getMenuPizzas,
  getAllActiveDrinks: getAllActiveDrinks,
  getAllActiveIngredients: getAllActiveIngredients
}