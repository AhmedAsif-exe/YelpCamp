const express = require('express');
const router = express.Router({
	mergeParams: true
});

const campgrounds = require('../controllers/campgrounds');
const ejsMate = require('ejs-mate');
const WrapAsync = require('../utils/WrapAsync');
const ExpressError = require('../utils/ExpressError');
const {
	Console
} = require('console');
const joi = require('joi');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const { storage } = require('../cloudinary/index');
const multer  = require('multer')
const upload = multer({ storage })

router.route('/')
	.get( WrapAsync(campgrounds.index))
	.post( isLoggedIn,  upload.array('image'), validateCampground,  WrapAsync(campgrounds.createCampground));
	
	
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
	.get( WrapAsync(campgrounds.showCampground))
	.put( isLoggedIn,  isAuthor,upload.array('image'), validateCampground, WrapAsync(campgrounds.updateCampground))
	.delete( isLoggedIn, isAuthor, WrapAsync(campgrounds.deleteCampground));


router.get('/:id/edit', isLoggedIn,  isAuthor, WrapAsync(campgrounds.renderEditForm))



module.exports = router;