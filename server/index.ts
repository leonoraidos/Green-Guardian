import express, { Request , Response } from "express";
import dotenv from 'dotenv';
const router = require('./router');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(` Server is running at http://localhost:${port}`);
});