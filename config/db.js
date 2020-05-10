const mongoose = require ('mongoose');
const config = require ('config');

const dbUri = config.get ('mongoUri');

const connectDb = async () => {
  try {
    await mongoose.connect (dbUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log ('connect to database');
  } catch (error) {
    console.log (error.message);
    process.exit (1);
  }
};

module.exports = connectDb;
