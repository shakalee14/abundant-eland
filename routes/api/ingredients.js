var express = require('express');
var router = express.Router();
var db = require('../../database');

router.get('/', function(request, response){
  db.getAllActiveIngredients()
    .then( data => {
      response.status(200).json({
          status: 'success',
          data: data,
          message: 'Returned all Ingredients'
      })
    })
  .catch( error => response.render('error', { error : error }));
})

router.get('/all', function(request, response){
  db.getAllIngredients()
    .then( data => {
      response.status(200).json({
          status: 'success',
          data: data,
          message: 'Returned all Ingredients'
      })
    })
  .catch( error => response.render('error', { error : error }));
})

router.get('/:id', function(request, response){
  db.getIngredientById( request.params )
  .then( data => {
    response.status(200).json({
      status: 'success',
      data: data,
      message: 'Returned ingredient at id'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.post('/', function(request, response){
  db.createIngredient( request.body )
  .then( () => {
    response.status(202).json({
      status: 'success',
      message: 'Created a new ingredient'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

router.put('/:id', function(request, response){
  const ingredient = request.body
  ingredient.id = request.params.id

  db.updateIngredient( ingredient )
  .then( data => {
    response.status(202).json({
      status:'success',
      data: data,
      message: 'Updated an ingredient'
    })
  })
  .catch( error => response.render('error', { error: error }));
})

router.put('/:id/delete', function(request, response){
  const id = request.params.id
  db.deleteIngredient( id )
  .then( () => {
    response.status(200).json({
      status: 'success',
      message: 'Deleted ingredient'
    })
  })
  .catch( error => response.render('error', { error : error }));
})

module.exports = router;
