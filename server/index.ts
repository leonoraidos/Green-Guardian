import express from "express";
import dotenv from 'dotenv';
import  router  from './router';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3001;

const corsConfig = {

  origin: 'http://localhost:3000',
  credentials: true,

};

const app = express();

//has to have these settings or else the body will be too large
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));


app.use(cors(corsConfig));


app.use(router);

app.listen(port, () => {
  console.log(` Server is running at http://localhost:${port}`);
});