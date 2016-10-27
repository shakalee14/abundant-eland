var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var createpizza = require('./routes/createpizza');
var api = require('./routes/api/auth');
var apiCustomers = require('./routes/api/cust');
var apiIngredients = require('./routes/api/ingredients');
var apiDrinks = require('./routes/api/drinks');
var apiPizzas = require('./routes/api/pizzas');
var apiTransactions = require('./routes/api/transactions');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieSession({
  name: 'session',
  keys: ['9B7^T(cL.6335P1D<o2`;Y"S1FWXTY', 'MG62S3V7t5yioNo8o9r6T8SSCsde81q3']
}))

app.use((request, response, next) => {
  response.locals.signedIn = 'customerId' in request.session
  next();
})
app.use('/', routes);
app.use('/users', users);
app.use('/createpizza', createpizza)
app.use('/api', api);
app.use('/api/customers', apiCustomers);
app.use('/api/ingredients', apiIngredients);
app.use('/api/drinks', apiDrinks);
app.use('/api/pizzas', apiPizzas);
app.use('/api/transactions', apiTransactions);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
