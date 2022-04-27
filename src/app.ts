import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts';
import { connectToMongoDB } from './services/mongoose';

dotenv.config()

const timeout = require('connect-timeout');
const app = express();
const route = express.Router()
const PORT = process.env.PORT;

(async () => {
  await connectToMongoDB(process.env.MONGODB_URI!)
})()

app.use(timeout('15s'))
app.use(cors())
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true}))
app.use(route)
app.use('/posts', postRoutes)

app.listen(PORT, () => {
  console.log('Server is running')
})