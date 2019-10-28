const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
body: String,
rating: Number,
author:
    {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
		secure_url: { type: String, default: '/images/default-profile.jpg' },
		public_id: String
	}
});


module.exports = mongoose.model('Review', ReviewSchema);