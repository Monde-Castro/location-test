const Post = require('../models/post');
const Review = require('../models/review');



module.exports = {

	//Review Create
	async createReview(req, res, next){
        //find the post by its id
        let post = await Post.findById(req.params.id).populate('reviews').exec();
        
        let haveReviewed = post.reviews.filter(review => {
                return review.author.equals(req.user._id);
        }).length;
        if(haveReviewed){
                req.session.error = 'Sorry you can only create one review per post.';
                return res.redirect(`/posts/${post.id}`);
        }
        
        //create the review
        req.body.review.author = req.user._id
        let review = await Review.create(req.body.review);
        //assign review to post
        post.reviews.push(review);
        //save the post
        post.save();
        //redirect to post
        req.session.success = 'Review created successfully!';
        res.redirect(`/posts/${post.id}`);
	},
	
	// Review Update
	async updateReview(req, res, next){
          await Review.findByIdAndUpdate(req.params.review_id, req.body.review);
          req.session.success = 'Review updated successfully !'
          res.redirect(`/posts/${req.params.id}`);
	},

	// Review Delete
	async deleteReview(req, res, next){
	 await Post.findByIdAndUpdate(req.params.id, {
                $pull: { reviews: req.params.review_id}
         });
         await Review.findByIdAndRemove(req.params.review_id);
         req.session.success = 'Review updated successfully !'
         res.redirect(`/posts/${req.params.id}`);
	}
}