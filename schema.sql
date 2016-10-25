DROP TABLE IF EXISTS customers;

CREATE TABLE customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  password VARCHAR NOT NULL,
  address VARCHAR(255),
  phone_number VARCHAR(20),
  payment_method VARCHAR
);

INSERT INTO customers ( name, user_name, password, address, phone_number, payment_method )
  VALUES ('Franklin Roosovelt', 'FDR', 'ovalOffice', '1600 Pennsylvania Ave', '555-555-5555', 'Credit Card');

DROP TABLE IF EXISTS pizzas;

CREATE TABLE pizzas (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

INSERT INTO pizzas ( name )
  VALUES ( 'Pepperoni Pizza' ),
  ( 'Sicilian Pizza' );



DROP TABLE IF EXISTS ingredients;

CREATE TABLE ingredients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(255),
  price DECIMAL NOT NULL
);

INSERT INTO ingredients ( name, description, type, price )
  VALUES ( 'Small', '10inch', 'Size', 5 ),
  ( 'Medium', '12inch', 'Size', 8 ),
  ( 'Large', '14inch', 'Size', 10 ),
  ( 'Thin Crust', 'New York Style', 'Crust', 2 ),
  ( 'Thick Crust', 'Thicker Chewy Crust', 'Crust', 2 ),
  ( 'Pepperoni', 'Meat', 'Topping', 1 ),
  ( 'Olives', 'Vegetable', 'Topping', 1 ),
  ( 'Mushrooms', 'Vegetable', 'Topping', 1 );

DROP TABLE IF EXISTS drinks;

CREATE TABLE drinks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  manufacturer VARCHAR(255) NOT NULL,
  supplier VARCHAR(255) NOT NULL,
  price DECIMAL NOT NULL
);

INSERT INTO drinks ( name, description, manufacturer, supplier, price )
  VALUES ( 'Peoples Cola', 'Worker Co-op Made Cola', 'The People', 'Frank', 1.25 ),
  ( 'Peoples Root Beer', 'Worker Co-op Made Root Beer', 'The People', 'Frank', 1.25 ),
  ( 'Peoples Lemonade', 'Worker Co-op Made Lemonade', 'The Other People', 'Olivia', 1.25 ),
  ( 'Peoples Cherry Soda', 'Worker Co-op Made Cherry Soda', 'The People', 'Frank', 1.25 ),
  ( 'Peoples Grape Pop', 'Worker Co-op Made Grape Pop', 'The Other People', 'Olivia', 1.25 );

DROP TABLE IF EXISTS transactions;

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_date DATE NOT NULL,
  price_total DECIMAL NOT NULL
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

INSERT INTO ingredients_pizzas (ingredient_id, pizza_id)
  VALUES (2,1),
  (4,1),
  (6,1),
  (2,2),
  (4,2),
  (7,2),
  (8,2);

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
