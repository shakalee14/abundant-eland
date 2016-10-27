var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function(request, response){
  db.getAllActiveIngredients()
  .then( data => { response.render('newpizza', {
    title: 'Create a Pizza',
    data: data })
  })
  .catch( error => response.render('error', { error : error }));
})

router.post('/', function(request, response){
  db.createMenuPizza( request.body )
  .then( result => {
    const pizza_id = result.id;
    Promise.all([db.addToPizzaIngredients(pizza_id, request.body)])
    .then(result => { response.render('success', {
      message:'you created a pizza' })
    })
  })
  .catch( error => response.render('error', { error : error }));
})

module.exports = router;