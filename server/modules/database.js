const mongoose = require("mongoose");

exports.connect = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log(`Connected to MongoDB: ${process.env.MONGO_URI}`);
};
