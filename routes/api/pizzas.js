var express = require('express');
var router = express.Router();
var db = require('../../database/database_pizzas.js');

router.get('/', function(request, response){
  db.getAllPizzas()
  .then( pizzas => {
    response.status(200).json({
      status: 'success',
      pizzas: pizzas,
      message: 'Returned all pizzas'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.put('/:id/ingredients', function(request, response){
  const newPizzaInfo = request.body
  newPizzaInfo.pizza_id = request.params.id

  Promise.all([ db.updatePizzaIngredients(newPizzaInfo), db.updatePizza(newPizzaInfo) ])
  .then( pizza => {
    response.status(200).json({
      status: 'success',
      pizza: pizza,
      message: 'Updated pizza ingredients and name'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.get('/menu', function(request, response){
  db.getMenuPizzas()
  .then( pizza => {
    response.status(200).json({
        status: 'success',
        pizza: pizza,
        message: 'Returned all menu pizzas'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.get('/:id', function(request, response){
  db.getPizzaById( request.params )
  .then( pizza => {
    Promise.all([db.getPizzaIngredients(pizza)])
    .then( ingredients => {
      response.status(200).json({
        status: 'success',
        pizza: pizza,
        ingredients: ingredients,
        message: 'Returned pizza at id'
      })
    })
  .catch( error => response.render('error', { error : error }));
  })
  .catch( error => response.render('error', { error : error }));
})

router.post('/', function(request, response){
  db.createMenuPizza( request.body )
  .then( result => {
    const pizza_id = result.id;
    Promise.all([db.addToPizzaIngredients(pizza_id, request.body)])
    .then(result => {
      response.status(200).json({
        status: 'success',
        message: 'Created a new pizza'
      })
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.put('/:id', function(request, response){
})

router.put('/:id/delete', function(request, response){
  const id = request.params.id

  db.deletePizza( id )
  .then( () => {
    response.status(200).json({
      status: 'success',
      message: 'Deleted pizza'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

module.exports = router;
