var express = require('express');
var router = express.Router();
var db = require('../database');

/* GET home page. */
router.get('/', function(request, response, next) {
  response.render('api')
  .catch( error => response.render('error', { error : error }));
});

router.post('/register', function(request, response) {
  db.createCustomer( request.body )
  .then( customer => {
    request.session.customerId = customer.id;
    response.redirect('/');
  })
  .catch( error => response.render('error', { error : error }));
})

router.get('/logout', function(request, response) {
  delete request.session.customerId;
  response.render('logout')
})

router.post('/login', function(request, response) {
  db.getCustomerByUserName( request.body )
  .then( customer => {
    request.session.customerId = customer.id;
    response.redirect('/');
  })
  .catch( error => response.render('error', { error : error }));
})

router.get('/customers', function(request, response){
  db.getAllCustomers()
    .then( data => {
      response.status(200).json({
          status: 'success',
          data: data,
          message: 'Returned all Customers'
      })
    })
  .catch( error => response.render('error', { error : error }));
})

router.get('/customers/:id', function(request, response){
  db.getCustomerById( request.params )
  .then( userId => {
    response.status(200).json({
      status: 'success',
      userId: userId,
      message: 'Returned customer at id'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.delete('/customers/:id', function(request, response){

})

router.put('/customers/:id', function(request, response){

})

router.get('/customers/:id/preferences', function(request, response){

})

router.post('/customers/:id/pizza/:id', function(request, response){

})

router.delete('/customers/:id/pizza/:id', function(request, response){

})

router.get('/ingredients', function(request, response){
  db.getAllIngredients()
    .then( data => {
      response.status(200).json({
          status: 'success',
          data: data,
          message: 'Returned all Ingredients'
      })
    })
  .catch( error => response.render('error', { error : error }));
})

router.get('/ingredients/:id', function(request, response){
  db.getIngredientById( request.params )
  .then( data => {
    response.status(200).json({
      status: 'success',
      data: data,
      message: 'Returned ingredient at id'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.post('/ingredients', function(request, response){

})

router.put('/ingredients/:id', function(request, response){

})

router.delete('/ingredients/:id', function(request, response){

})

router.get('/drinks', function(request, response){
  db.getAllDrinks()
    .then( data => {
      response.status(200).json({
          status: 'success',
          data: data,
          message: 'Returned all drinks'
      })
    })
  .catch( error => response.render('error', { error : error }));
})

router.get('/drinks/:id', function(request, response){
  db.getDrinkById( request.params )
  .then( data => {
    response.status(200).json({
      status: 'success',
      data: data,
      message: 'Returned drink at id'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.delete('/drinks/:id', function(request, response){

})

router.put('/drinks/:id', function(request, response){

})

router.post('/drinks', function(request, response){

})

router.get('/pizzas', function(request, response){
  db.getAllPizzas()
    .then( data => {
      response.status(200).json({
          status: 'success',
          data: data,
          message: 'Returned all pizzas'
      })
    })
  .catch( error => response.render('error', { error : error }));
})

router.get('/pizzas/menu', function(request, response){

})

router.get('/pizzas/:id', function(request, response){
  db.getPizzaById( request.params )
  .then( data => {
    response.status(200).json({
      status: 'success',
      data: data,
      message: 'Returned pizza at id'
    })
  })
  .catch( error => response.render('error', { error : error }));
})


router.post('/pizzas', function(request, response){

})

router.put('/pizzas/:id', function(request, response){

})

router.delete('/pizzas/:id', function(request, response){

})

router.get('/transactions', function(request, response){
  db.getAllTransactions()
    .then( data => {
      response.status(200).json({
          status: 'success',
          data: data,
          message: 'Returned all transactions'
      })
    })
  .catch( error => response.render('error', { error : error }));
})

router.post('/transactions', function(request, response){

})

router.get('/transactions/:id', function(request, response){
  db.getTransactionById( request.params )
  .then( data => {
    response.status(200).json({
      status: 'success',
      data: data,
      message: 'Returned transaction at id'
    })
  })
  .catch( error => response.render('error', { error : error }));
})


router.put('/transactions/:id', function(request, response){

})

router.get('/transactions/customers/:id', function(request, response){

})

router.get('/transactions/:id/customers/:id', function(request, response){

})

module.exports = router;
