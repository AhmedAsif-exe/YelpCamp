const Campground = require('../models/campground');
const review = require('../models/review');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewid } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    console.log(id, reviewid)
    await Review.findByIdAndDelete(reviewid);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/campgrounds/${id}`);
}