const express = require("express");
const router = express.Router();

const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedin } = require("../middleware.js");
const listingcontroller = require("../Controller/listing.js")
const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })

// index route
router.route("/")
    .get(wrapAsync(listingcontroller.index))
    .post(isLoggedin, upload.single('listing[image]'), wrapAsync(listingcontroller.createlisting));

// new listing
router.get("/new", isLoggedin, listingcontroller.renderNewForm)

//show route
router.route("/:id")
    .get(wrapAsync(listingcontroller.showListing))
    .put(isLoggedin, upload.single('listing[image]'), wrapAsync(listingcontroller.updateListing))
    .delete(isLoggedin, wrapAsync(listingcontroller.destroyListing));

// edit route
router.get("/:id/edit", isLoggedin, wrapAsync(listingcontroller.renderEditForm));

module.exports = router;