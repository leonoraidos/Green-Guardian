import express, { Request , Response } from "express";
import dotenv from 'dotenv';
const router = require('./router');
const cors = require('cors');

dotenv.config();

const port = process.env.PORT || 3001;

const corsConfig = {

  origin: 'http://localhost:3000',
  credentials: true,

};

const app = express();
app.use(express.json());


app.use(cors(corsConfig));


app.use(router);

app.listen(port, () => {
  console.log(` Server is running at http://localhost:${port}`);
});