var express = require('express');
var router = express.Router();
var db = require('../../database');

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

module.exports = router;
