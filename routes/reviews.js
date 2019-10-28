const express = require('express');
const router = express.Router({ mergeParams: true });
const { asyncErrorHandler, isReviewAuthor} = require('../middleware')
const { createReview, updateReview,  deleteReview } = require('../controller/reviews');

  /* POST reviews creat /posts/:id/reviews */
router.post('/', asyncErrorHandler(createReview) );
 
  /* PUT reviews uppdate /posts/:id/reviews/:reviews_id */
router.put('/:review_id', isReviewAuthor, asyncErrorHandler(updateReview));

  /* DELETE reviews destroy /posts/:id/reviews/:reviews_id */
router.delete('/:review_id', isReviewAuthor ,asyncErrorHandler(deleteReview));

module.exports = router;