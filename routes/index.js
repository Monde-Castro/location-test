const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});
const router = express.Router();
const { 
  landingPage, 
  getRegister, 
  getLogin,
  postRegister, 
  postLogin, 
  getLogout, 
  getProfile,
  updateProfile,
  getForgotPw,
  putForgotPw,
  getReset,
  putReset
} = require('../controller/index');
const { 
  asyncErrorHandler, 
  isLoggedIn,
  isValidPassword,
  changePassword,
 } = require('../middleware/index');

/* GET home page. */
router.get('/', asyncErrorHandler(landingPage));

/* GET /register */
router.get('/register', getRegister);
 
/* POST /register */
router.post('/register', upload.single('image'), asyncErrorHandler(postRegister));

/* GET /login */
router.get('/login', getLogin);

/* POST /login */
router.post('/login', asyncErrorHandler(postLogin));

/* Get /logOUT */
router.get('/logout', getLogout);

/* GET /profile */
router.get('/profile', isLoggedIn, asyncErrorHandler(getProfile));


/* PUT /profile/:user_id */
router.put('/profile', 
  upload.single('image'), 
  isLoggedIn,
  asyncErrorHandler(isValidPassword),
  asyncErrorHandler(changePassword),
  asyncErrorHandler(updateProfile) 
  );

/* GET /forgot-pw */
router.get('/forgot-password', getForgotPw);

/* PUT /forgot-password */
router.put('/forgot-password', asyncErrorHandler(putForgotPw));

/* GET /reset-password/:token */
router.get('/reset/:token', asyncErrorHandler(getReset));

/* PUT /reset-pw/:token */
router.put('/reset/:token',asyncErrorHandler(putReset));
module.exports = router;
