const MongoClient = require("mongodb").MongoClient;

let db;
MongoClient.connect(
  process.env.MONGO_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err, client) => {
    if (err) {
      console.error(err);
    }
    db = client.db(process.env.DB_NAME);
    console.log(`Connected to MongoDB: ${process.env.MONGO_URI}`);
    console.log(`Database: ${process.env.DB_NAME}`);
  }
);

// Data access helpers
const createRecord = async (collection, data) => {
  try {
    const record = await db.collection(collection).insertOne(data);
    return record.insertedId;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
const updateRecord = async (collection, filter, data) => {
  try {
    const record = await db
      .collection(collection)
      .updateOne(filter, { $set: data });
    return record.nModified;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
const deleteRecord = async (collection, filter) => {
  try {
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
const getRecords = async (collection, filter) => {
  try {
    const records = await db.collection(collection).find(filter);
    if (records.count() === 0) {
      return false;
    }
    return records.toArray();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

module.exports = {
  createRecord,
  updateRecord,
  deleteRecord,
  getRecords,
};
