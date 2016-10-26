var express = require('express');
var router = express.Router();
var db = require('../../database');

router.get('/', function(request, response){
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

router.get('/:id', function(request, response){
  db.getCustomerById( request.params )
  .then( customerId => {
    response.status(200).json({
      status: 'success',
      customerId: customerId,
      message: 'Returned customer at id'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.put('/:id/delete', function(request, response){
  const id = request.params.id
  db.deleteCustomer( id )
  .then( () => {
    response.status(200).json({
      status: 'success',
      message: 'Deleted customer'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.put('/:id', function(request, response){
  const customer = request.body
  customer.id = request.params.id
  db.updateCustomer( customer )
  .then( customer => {
    response.status(200).json({
      status: 'success',
      customer: customer,
      message: 'Updated customer information'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.get('/:id/preferences', function(request, response){

})

router.post('/:id/pizza/:id', function(request, response){

})

router.delete('/:id/pizza/:id', function(request, response){

})

module.exports = router;
