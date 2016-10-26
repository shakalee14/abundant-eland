var express = require('express');
var router = express.Router();
var db = require('../../database');

router.get('/', function(request, response){
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

router.post('/customers/:id', function(request, response){
  const transactionInfo = request.body
  transactionInfo.customer_id = request.params.id

  db.createNewTransactionForCustomer( transactionInfo )
  .then( data => {
    const transaction_id = data.id;
    Promise.all([db.addPizzaToTransaction(transactionInfo, transaction_id), db.addDrinkToTransaction(transactionInfo, transaction_id)
    ])
    .then( data => {
      response.status(200).json({
        status: 'success',
        data: data,
        message: 'Created transaction for customer using their id'
      })
    })
    .catch( error => response.render('error', { error : error }));
  })
  .catch( error => response.render('error', { error : error }));
})

router.get('/:id', function(request, response){
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

router.get('/customers/:id', function(request, response){
  const id = request.params
  db.getTransactionsForCustomer( id )
  .then( data => {
    response.status(200).json({
      status: 'success',
      data: data,
      message: 'Returned transaction at id'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.get('/customers/:id/recent', function(request, response){
  const id = request.params
  db.getMostRecentTransactionForCustomer( id )
  .then( data => {
    response.status(200).json({
      status: 'success',
      data: data,
      message: 'Returned transaction at id'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.put('/:id/delete', function(request, response){
  db.deleteTransaction( request.params.id )
  .then( data => {
    response.status(200).json({
      status: 'success',
      data: data,
      message: 'Deleted transaction'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

module.exports = router;
