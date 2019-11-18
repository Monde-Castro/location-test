const crypto = require('crypto')
const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'location',
	api_key: '252468637462473',
	api_secret: '47HVklt3vR_4sxsfLC4rPt6F-Hc'
});
const cloudinaryStorage = require('multer-storage-cloudinary');
const storage = cloudinaryStorage({
    cloudinary,
    folder: 'location',
    allowedFormats: ['jpeg', 'jpg', 'png'],
    filename: function(req, file, cb){
        let buf = crypto.randomBytes(16);
        buf = buf.toString('hex');
        let uniqFilename = file.originalname.replace(/\.jpeg|\.jpg|\.png/ig, '');
        uniqFilename += buf;
        cb(undefined, uniqFilename);
    }
});

module.exports = {
    cloudinary,
    storage
}