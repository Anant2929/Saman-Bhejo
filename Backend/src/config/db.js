const { connect } = require('mongoose');
const { config } =  require('dotenv');
config();

const connectDB = async () => {
  try {
    await connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected successfully`);
  } catch (error) {
    console.error("Error in connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

