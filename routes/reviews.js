const express = require('express')
const router = express.Router({
	mergeParams: true
});
const mongoose = require('mongoose');
const Campground = require('../models/campground');
const Reviews = require('../models/review');
const ejsMate = require('ejs-mate');
const WrapAsync = require('../utils/WrapAsync');
const {
	isLoggedIn,
	isReviewAuthor,
	validateReview
} = require('../middleware')
const ExpressError = require('../utils/ExpressError');
const {
	Console
} = require('console');
const joi = require('joi');

const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, WrapAsync(reviews.createReview))
router.delete('/:reviewid', isLoggedIn, isReviewAuthor, WrapAsync(reviews.deleteReview))


module.exports = router;