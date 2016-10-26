INSERT INTO customers ( name, user_name, password, address, phone_number, payment_method )
  VALUES ('Franklin Roosovelt', 'FDR', 'ovalOffice', '1600 Pennsylvania Ave', '555-555-5555', 'Credit Card');

INSERT INTO pizzas ( name )
  VALUES ( 'Pepperoni Pizza' ),
  ( 'Sicilian Pizza' );

INSERT INTO ingredients ( name, description, type, price )
  VALUES ( 'Small', '10inch', 'Size', 5 ),
  ( 'Medium', '12inch', 'Size', 8 ),
  ( 'Large', '14inch', 'Size', 10 ),
  ( 'Thin Crust', 'New York Style', 'Crust', 2 ),
  ( 'Thick Crust', 'Thicker Chewy Crust', 'Crust', 2 ),
  ( 'Pepperoni', 'Meat', 'Topping', 1 ),
  ( 'Olives', 'Vegetable', 'Topping', 1 ),
  ( 'Mushrooms', 'Vegetable', 'Topping', 1 );

INSERT INTO drinks ( name, description, manufacturer, supplier, price )
  VALUES ( 'Peoples Cola', 'Worker Co-op Made Cola', 'The People', 'Frank', 1.25 ),
  ( 'Peoples Root Beer', 'Worker Co-op Made Root Beer', 'The People', 'Frank', 1.25 ),
  ( 'Peoples Lemonade', 'Worker Co-op Made Lemonade', 'The Other People', 'Olivia', 1.25 ),
  ( 'Peoples Cherry Soda', 'Worker Co-op Made Cherry Soda', 'The People', 'Frank', 1.25 ),
  ( 'Peoples Grape Pop', 'Worker Co-op Made Grape Pop', 'The Other People', 'Olivia', 1.25 );

INSERT INTO ingredients_pizzas (ingredient_id, pizza_id)
  VALUES (2,1),
  (4,1),
  (6,1),
  (2,2),
  (4,2),
  (7,2),
  (8,2);
