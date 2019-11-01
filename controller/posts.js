const Post = require('../models/post');
const { cloudinary } = require('../cloudinary');

module.exports = {
    // Posts Index
	async getPosts(req, res, next) {
		const {dbQuery } = res.locals; 
		delete res.locals.dbQuery ;
		let posts = await Post.paginate( dbQuery, {
			page: req.query.page || 1,
			limit: 10,
			sort: '-_id'
		});
		posts.page = Number(posts.page);
		if(!posts.docs.length && res.locals.query){
			res.locals.error = 'No results match that query.';
		}
		
		res.render('posts/index', { posts , title: 'Location - Posts'});
    },
	
	//Post New
	newPost(req, res, next){
		res.render('posts/new')
	},

	//Post Create
	async createPost(req, res, next){
		req.body.post.images = [];
		for(const file of req.files){
			req.body.post.images.push({
				url: file.secure_url,
				public_id: file.public_id
			});
		}
		req.body.post.author = req.user._id;
		let post = await Post.create(req.body.post);
		post.save();
		req.session.success = 'Post created successfully!!'
		res.redirect(`/posts/${post.id}`);
	},
		//Post Show
	async showPost(req, res, next){
		let post = await Post.findById(req.params.id).populate({
			path: 'reviews',
			
			populate:{
				path: 'author',
				model: 'User'
			}
		});
		const floorRating = post.calculateAvgRating();
		res.render('posts/show', {post, floorRating});
	},

	// Post Edit
	 editPost(req, res, next){
		res.render('posts/edit');
	},

	// Post Update
	async updatePost(req, res, next){
		// destructure post from res.locals
		const { post } = res.locals;
		//check if there's any images for deletion
		if(req.body.deleteImages && req.body.deleteImages.length){
			//assign deleteImage from req.body to its own variable
			let deleteImages = req.body.deleteImages;
			//loop over deleteImages
			for(const public_id of deleteImages){
				//delete images from cloudinary
				 await cloudinary.v2.uploader.destroy(public_id);
				//delete image from post.images
				for(const image of post.images){
					if(image.public_id === public_id){
						let index = post.images.indexOf(image);
						post.images.slice(index, 1)
					}
				}
			}

		};
		//check if there any new images for upload
		if(req.files){
		//upload images
		for(const file of req.files){
				//add images to post.images array
				post.images.push({
					url: file.secure_url,
					public_id: file.public_id
				});
			}

		}

		//update the post with any new properties
		post.title = req.body.post.title
		post.description = req.body.post.description
		post.price = req.body.post.price
		post.location = req.body.post.location
		//save the updated post into the db
		await post.save();
		//redirect to show page
		res.redirect(`/posts/${post.id}`);
	},

	// Post Delete
	async deletePost(req, res, next){
		const { post }  = res.locals;
		for(const image of post.images){
			await cloudinary.v2.uploader.destroy(image.public_id);
		}
		await post.remove();
		req.session.success = 'Post deleted successfully !'
		res.redirect('/posts');
	}
}