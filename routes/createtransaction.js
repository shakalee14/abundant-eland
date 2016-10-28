var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/', function(request, response){
  Promise.all([ db.getMenuPizzas(), db.getAllActiveDrinks(), db.getAllCustomers() ])
  .then( result => {
    response.render('transaction', {result} ) })
})

router.post('/', function(request,response){
  const transactionInfo = request.body
  const customer = request.session.customer_id
  transactionInfo.customer_id

  db.createNewTransactionForCustomer( transactionInfo )
  .then( data => {
    const transaction_id = data.id;
    Promise.all([db.addPizzaToTransaction(transactionInfo, transaction_id), db.addDrinkToTransaction(transactionInfo, transaction_id)
    ])
    .then( data => {
      response.render('success', {message:'your order is placed, it will be 32mins'})
    })
  })
  .catch( error => response.render('error', { error : error }));
})

module.exports = router;