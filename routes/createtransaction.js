var express = require('express');
var router = express.Router();
var db = require('../database/menu.js');
var db_transaction = require('../database/database_transactions.js')
var db_customers = require('../database/database_customers.js')

router.get('/', function(request, response){
  Promise.all([ db.getMenuPizzas(), db.getAllActiveDrinks(), db_customers.getAllCustomers() ])
  .then( result => {
    response.render('transaction', {result} ) })
})

router.post('/', function(request,response){
  const transactionInfo = request.body
  const customer = request.session.customer_id
  transactionInfo.customer_id

  db_transaction.createNewTransactionForCustomer( transactionInfo )
  .then( data => {
    const transaction_id = data.id;
    Promise.all([db_transaction.addPizzaToTransaction(transactionInfo, transaction_id), db_transaction.addDrinkToTransaction(transactionInfo, transaction_id)
    ])
    .then( data => {
      response.render('success', {
        message:'Order  '+transaction_id+' is placed :)',
        data: data
      })
    })
  })
  .catch( error => response.render('error', { error : error }));
})

module.exports = router;