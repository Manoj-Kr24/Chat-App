const mongoose = require("mongoose");
const { DB_NAME } = require("../../constants");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`,
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    // console.log(`Conn.connection: ${conn.connection} `);
  } catch (error) {
    console.log(`Error: ${error.message} `.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
