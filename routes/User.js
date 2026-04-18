const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { saveRedirectUrl } = require("../middleware.js");

const usercontroller = require("../Controller/user.js");


// signin 
router.route("/signin")
    .get(usercontroller.renderSignin)
    .post(wrapAsync(usercontroller.signin));

// Login
router.route("/login")
    .get(usercontroller.renderLogin)
    .post(saveRedirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), usercontroller.login)

// logout
router.get("/logout", usercontroller.logout);

module.exports = router;