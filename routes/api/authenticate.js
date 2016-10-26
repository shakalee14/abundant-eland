var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var db = require('../../database');

router.post('/', function( request, response ){
  db.getCustomerByUserName({
    user_name: request.body.user_name
  }, function(err, user){
    if (err) throw err;

    if (!user) {
      response.json({ success: false, message: 'authentication failed, user not found'});
    } else if (user){

      if (user.password != request.body.password){
        response.json({ success: false, message: 'authentication failed, wrong password'});
      } else {

        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 140
        });
        response.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }
    }
  });
});

module.exports = router;
