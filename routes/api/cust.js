var express = require('express');
var router = express.Router();
var db = require('../../database');

router.get('/', function(request, response){
  db.getAllActiveCustomers()
  .then( data => {
    response.status(200).json({
        status: 'success',
        data: data,
        message: 'Returned all active customers'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.get('/all', function(request, response){
  db.getAllCustomers()
  .then( data => {
    response.status(200).json({
        status: 'success',
        data: data,
        message: 'Returned all customers'
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
  db.getPreferencesForCustomer(request.params)
  .then( data => {
    response.status(200).json({
      status: 'success',
      data: data,
      message: 'Returned pizza preferences for single customer'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.post('/:cid/:pid', function(request, response){
  db.addPizzaPreference( request.params )
  .then( data => {
    response.status(200).json({
      status: 'success',
      data: data,
      message: 'Added customer pizza preference'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.delete('/:cid/:pid', function(request, response){
  db.deletePizzaPreference( request.params )
  .then( data => {
    response.status(200).json({
      status: 'success',
      data: data,
      message: 'Deleted customer pizza preference'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

module.exports = router;
