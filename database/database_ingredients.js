const databaseName = 'pizzastore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')();
const db = pgp( connectionString );
const bcrypt = require('bcrypt-nodejs');

const getAllIngredients = () => {
  const sql = `
    SELECT
      *
    FROM
      ingredients
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

module.exports = {
  getAllIngredients: getAllIngredients,
  getAllActiveIngredients: getAllActiveIngredients,
  getIngredientById: getIngredientById,
  createIngredient: createIngredient,
  deleteIngredient: deleteIngredient,
  updateIngredient: updateIngredient,
}