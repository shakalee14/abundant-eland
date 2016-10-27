var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('index', { title: 'Pizza CRUD App' });
});

router.get('/menu', function(request, response){
  Promise.all([db.getMenuPizzas(),
    db.getAllActiveDrinks(),
    db.getAllActiveIngredients()
    ])
  .then( data => {
      var pizzas = data[0]
      var drinks = data[1]
      var ingredients = data[2]
      response.render( 'menu', { pizzas, drinks, ingredients })
    })
  .catch( error => response.render('error', { error : error }));
})

module.exports = router;
