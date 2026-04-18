const { response } = require("express");
const Listing = require("../models/listing");
const mbxgeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxgeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
    const allistings = await Listing.find({});
    res.render("listings/index.ejs", { allistings });
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    res.render("listings/show.ejs", { listing });
}

module.exports.createlisting = async (req, res) => {
    let response = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    })
        .send();

    let url = req.file.path;
    let fileName = req.file.filename;
    const listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image = { url, fileName };
    listing.geometry = response.body.features[0].geometry
    await listing.save();
    req.flash("success", "listing Created Successfully");
    res.redirect("/listings");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let fileName = req.file.filename;
        listing.image = { url, fileName };
        await listing.save();
    }
    req.flash("success", "listing Updated Successfully");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    req.flash("success", "listing Deleted Successfully");
    res.redirect("/listings");
}