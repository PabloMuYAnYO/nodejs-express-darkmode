const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();


// * view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));
// ? Agregar un favicon
// app.use(favicon(path.join(__dirname, 'public', './drive/upload/icons8-internet-explorer-50.png')));
// ? External js in an EJS template
app.use(express.static(path.join(__dirname, 'public','./public/javascripts/darkmode.js')));

// ! catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// ! error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;