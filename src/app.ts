import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts';
import { connectToMongoDB } from './services/mongoose';

dotenv.config()

const app = express();
const route = express.Router()
const PORT = process.env.PORT || 5001;

app.use(cors())
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true}))
app.use(route)
app.use('/posts', postRoutes)

connectToMongoDB(process.env.MONGODB_URI!)
  .then((res) => {
    app.listen(PORT, () => {
      console.log('Server is running')
    })
  })
  .catch(error => {
    console.log(error);
  })