var express = require('express');
var router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({storage});
const { 
  asyncErrorHandler,
  isLoggedIn, 
  isAuthor, 
  searchAndFilterPosts
 } = require('../middleware');
const { 
  getPosts, 
  newPost, 
  createPost, 
  showPost, 
  editPost, 
  updatePost,
  deletePost} = require('../controller/posts');

/* GET posts index /posts */
router.get('/', asyncErrorHandler(searchAndFilterPosts), asyncErrorHandler(getPosts) );

/* GET posts new /posts/new  */
router.get('/new', isLoggedIn, newPost );

/* POST posts create /posts */
router.post('/', isLoggedIn, upload.array('images', 4), asyncErrorHandler(createPost));

/* GET posts show /posts/:id */
router.get('/:id', asyncErrorHandler(showPost));

  /* GET posts edit /posts/edit/:id */
router.get('/edit/:id', isLoggedIn, asyncErrorHandler(isAuthor), editPost);

  /* PUT posts update /posts/:id */
router.put('/:id',isLoggedIn , asyncErrorHandler(isAuthor) ,upload.array('images', 4),  asyncErrorHandler(updatePost));

  /* DELETE posts destroy /posts/:id */
router.delete('/:id', isLoggedIn,asyncErrorHandler(isAuthor) , asyncErrorHandler(deletePost));

module.exports = router;