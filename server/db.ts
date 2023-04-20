const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'green_guardian';


async function connectToDatabase() {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:${DB_PORT}/${DB_NAME}`);
    console.log(`🦆 Database connected @ port ${DB_PORT}!`);
  } catch (error) {
    console.log(`😞 Sorry, something went wrong! ${error}`)
  }
}

connectToDatabase();


export default mongoose;