DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  password VARCHAR NOT NULL,
  address VARCHAR(255),
  phone_number VARCHAR(20),
  payment_method VARCHAR,
  is_active BOOLEAN DEFAULT TRUE
);

DROP TABLE IF EXISTS pizzas;

CREATE TABLE pizzas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE
);

DROP TABLE IF EXISTS ingredients;

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(255),
  price DECIMAL NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

DROP TABLE IF EXISTS drinks;

CREATE TABLE drinks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  manufacturer VARCHAR(255) NOT NULL,
  supplier VARCHAR(255) NOT NULL,
  price DECIMAL NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_date DATE NOT NULL,
  price_total DECIMAL NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

DROP TABLE IF EXISTS customers_pizzas;

CREATE TABLE customers_pizzas (
  customer_id INTEGER NOT NULL,
  pizza_id INTEGER NOT NULL
);

DROP TABLE IF EXISTS ingredients_pizzas;

CREATE TABLE ingredients_pizzas (
  ingredient_id INTEGER NOT NULL,
  pizza_id INTEGER NOT NULL
);

DROP TABLE IF EXISTS pizza_transactions;

CREATE TABLE pizza_transactions (
  pizza_id INTEGER NOT NULL,
  transaction_id INTEGER NOT NULL,
  amount INTEGER NOT NULL
);

DROP TABLE IF EXISTS drink_transactions;

CREATE TABLE drink_transactions (
  drink_id INTEGER NOT NULL,
  transaction_id INTEGER NOT NULL,
  amount INTEGER NOT NULL
);
