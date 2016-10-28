const databaseName = 'pizzastore'
const connectionString = `postgres://${process.env.USER}@localhost:5432/${databaseName}`
const pgp = require('pg-promise')();
const db = pgp( connectionString );
const bcrypt = require('bcrypt-nodejs');

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

const getDrinkById = attributes => {
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

module.exports = {
  createDrink: createDrink,
  getAllDrinks: getAllDrinks,
  getAllActiveDrinks: getAllActiveDrinks,
  getDrinkById: getDrinkById,
  updateDrink: updateDrink,
  deleteDrink: deleteDrink
}