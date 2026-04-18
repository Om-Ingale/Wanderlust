const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const review = require("../models/review.js");
const { isLoggedin } = require("../middleware.js");
const reviewcontroller = require("../Controller/review.js");

// review
// Post
router.post("/", isLoggedin, reviewcontroller.newReview);

// reviews delete
router.delete("/:reviewID", wrapAsync(reviewcontroller.destroyReview));

module.exports = router;