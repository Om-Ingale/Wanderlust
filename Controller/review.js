const Listing = require("../models/listing");
const review = require("../models/review");

module.exports.newReview = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(req.params.id);
    let newReview = new review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review Posted Successfully");

    res.redirect(`/listings/${id}`);
}

module.exports.destroyReview = async (req, res) => {
    let { id, reviewID } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });
    await review.findByIdAndDelete(reviewID);
    req.flash("success", "Review Deleted Successfully");
    res.redirect(`/listings/${id}`);
}