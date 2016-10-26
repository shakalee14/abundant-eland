var express = require('express');
var router = express.Router();
var db = require('../../database');

router.get('/', function(request, response){
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

router.get('/:id', function(request, response){
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

router.put('/:id/delete', function(request, response){
  const id = request.params.id
  db.deleteDrink( id )
  .then( () => {
    response.status(200).json({
      status: 'success',
      message: 'Deleted drink'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.put('/:id', function(request, response){
  const drink = request.body
  drink.id = request.params.id

  db.updateDrink( drink )
  .then( data => {
    response.status(202).json({
      status:'success',
      data: data,
      message: 'Updated an drink'
    })
  })
  .catch( error => response.render('error', { error: error }));
})

router.post('/', function(request, response){
  db.createDrink( request.body )
  .then( () => {
    response.status(202).json({
      status: 'success',
      message: 'Created a new drink'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

module.exports = router;
