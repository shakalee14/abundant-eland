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

router.post('/', function(request, response){

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

router.put('/:id', function(request, response){

})

router.get('/customers/:id', function(request, response){

})

router.get('/:id/customers/:id', function(request, response){

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
