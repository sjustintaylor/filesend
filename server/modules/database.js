const { MongoClient } = require("mongodb");
const db = await new MongoClient(process.env.MONGO_URI).connect();

module.exports = db;
