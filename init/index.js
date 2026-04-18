const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main().then(() => {
  console.log("connected succesfully");
})
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "689b7b46d01e25d9f4d24241" }));
  await Listing.insertMany(initData.data);
  console.log("data was intitlaized");
}

initDB();