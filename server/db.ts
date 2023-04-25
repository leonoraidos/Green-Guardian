//import mongoose from "mongoose";

//i noticed i had this has require and tried to change it to import
//this then broke everything else related to the Plant documents...
//it was midnight the day before the demos so excuse this 
// eslint-disable-next-line @typescript-eslint/no-var-requires
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