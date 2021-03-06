var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var indexRouter = require('./routes/index');
var registrationRouter = require('./routes/user/registration');
var loginRouter = require('./routes/user/login');
var loginWithTokenRouter = require('./routes/user/loginWithToken');
var forgotRouter = require('./routes/user/forgot');
var changeUserInfoRouter = require('./routes/profile/changeUserInfo');
var changePasswordRouter = require('./routes/profile/changePassword');
var changeAvatarRouter = require('./routes/profile/changeAvatar');
var changeRoleRouter = require('./routes/profile/changeRole');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/registration', registrationRouter);
app.use('/login', loginRouter);
app.use('/login_with_token', loginWithTokenRouter);
app.use('/forgot', forgotRouter);
app.use('/profile/info', changeUserInfoRouter);
app.use('/profile/password', changePasswordRouter);
app.use('/profile/avatar', changeAvatarRouter);
app.use('/profile/role', changeRoleRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
