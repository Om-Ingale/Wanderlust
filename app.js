if (process.env.NODE_ENV != "production") {
  require('dotenv').config();
}

// require
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/User.js");

// session
const sessionOptions = {
  secret: 'mySecretCode',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true
  }
}

app.use(session(sessionOptions));
app.use(flash());

// authorization
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// routers
const listingsRouter = require("./routes/listings.js");
const reviewsRouter = require("./routes/reviews.js");
const UserRouter = require("./routes/User.js");

// set packages
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

// Mongoose setting
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(MONGO_URL);
}

// express port
const port = 8080;
main().then(() => {
  console.log("connected succesfully");
})
  .catch((err) => {
    console.log(err);
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
})

// set routers
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", UserRouter);

// err
app.get('*splat', (req, res, next) => {
  res.render("notfound.ejs");
  next();
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Invalid Request Sent" } = err;
  res.status(statusCode).render("error.ejs", { message });
});


