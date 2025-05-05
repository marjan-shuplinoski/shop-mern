import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
  next();
});

app.use('/api/products',productRoutes)

app.listen(process.env.BACKEND_PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:"+process.env.BACKEND_PORT);
});

