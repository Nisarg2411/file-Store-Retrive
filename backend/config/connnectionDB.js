const { mongoose } = require("mongoose");

const connectionDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) console.log("Connected To Database");
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectionDB;
