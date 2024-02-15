const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://root:Capshek@cluster0.qlxbzre.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'hackathon'
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

//mongodb+srv://root:<password>@cluster0.qlxbzre.mongodb.net/