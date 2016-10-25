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

INSERT INTO customers (name, user_name, password, address, phone_number, payment_method)
  VALUES ('Franklin Roosovelt', 'FDR', 'ovalOffice', '1600 Pennsylvania Ave', '555-555-5555', 'Credit Card');
