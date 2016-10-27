var express = require('express');
var router = express.Router();
var db = require('../../database');
var bcrypt = require('bcrypt-nodejs');

router.get('/', function(request, response, next) {
  response.render( 'api' )
  .catch( error => response.render( 'error', { error : error } ));
});

router.post('/register', function(request, response) {
  const user_name = request.body
  db.checkCustomerUserName(user_name)
  .then( result => {
    if(result.count == 0){
      db.createCustomer( user_name )
      .then( customer => {
        request.session.customerId = customer.id;
        response.redirect('/');
      })
      .catch( error => response.render( 'error', { error : error } ));
    } else {
      response.render( 'api', { message:'User name already taken' })
    }
  })
  .catch( error => response.render( 'error', { error : error } ));
})

router.post('/login', function(request, response) {
  db.getCustomerByUserName( request.body )
  .then( customer => {
    if(bcrypt.compareSync(request.body.password, customer.password)){
      request.session.customerId = customer.id;
      response.redirect('/');
     } else {
      response.send( { message: 'Wrong password' } )
    }
  })
  .catch( error => response.render( 'error', { error : error } ));
})

router.get('/logout', function(request, response) {
  delete request.session.customerId;
  response.render( 'logout' )
})

module.exports = router;
