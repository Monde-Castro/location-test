const crypto = require('crypto')
const cloudinary = require('cloudinary');
cloudinary.config({
	cloud_name: 'location',
	api_key: '#########',
	api_secret: '##############'
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
