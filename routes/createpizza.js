var express = require('express');
var router = express.Router();
var db_ingredients = require('../database/database_ingredients.js');
var db_pizza = require('../database/database_pizzas.js');

router.get('/', function(request, response){
  db_ingredients.getAllActiveIngredients()
  .then( data => { response.render('newpizza', {
    title: 'Create a Pizza',
    data: data })
  })
  .catch( error => response.render('error', { error : error }));
})

router.post('/', function(request, response){
  db_pizza.createMenuPizza( request.body )
  .then( result => {
    const pizza_id = result.id;
    Promise.all([db_pizza.addToPizzaIngredients(pizza_id, request.body)])
    .then(result => { response.render('success', {
      message:'You Created a Pizza' })
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.get('/ingredients', function(request, response){
  response.render('ingredients')
})

router.post('/ingredients', function(request, response){
  const ingredientInfo = request.body
  ingredientInfo.type = 'Topping'

  db_ingredients.createIngredient( ingredientInfo )
  .then( result => { response.render('success', {message:'You added an ingredient!'})
  })
  .catch( error => response.render('error', { error : error }));
})

module.exports = router;