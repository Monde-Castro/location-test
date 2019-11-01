require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const User = require('./models/user');
const session =require('express-session');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Require Routes
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const reviewsRouter = require('./routes/reviews');


const app = express();
// connect to the database
mongoose.connect('mongodb://localhost:27017/Location', { 

  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('we\'re connected!');
});
//use ejs-locals for all ejs template:
app.engine('ejs', engine);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//Configure Passport and Sessions
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// set local variable middleware
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  // set default page title
  res.locals.title = 'Location'
  // set success flash message
  res.locals.success = req.session.success || '';
  delete req.session.success
  // set error flash message
  res.locals.error = req.session.error || '';
  delete req.session.error
  // continue on to next function in middleware chain
  next();
});
//Mount Routes
app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/posts/:id/reviews', reviewsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'producation' ? err : {};

  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
  //console.log(err)
  req.session.error = err.message;
  res.redirect('back');
});



module.exports = app;
