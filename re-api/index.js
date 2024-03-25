import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';
import cron from 'node-cron';
import axios from 'axios'; // Import axios for making HTTP requests

dotenv.config();

const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve()

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!!!`);
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Health check endpoint to verify server status
app.get('/health', (req, res) => {
  res.send('Server is running');
});

app.use(express.static(path.join(__dirname, '/re-client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 're-client', 'dist', 'index.html'))
})

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Define a cron job to run every 15 minutes
cron.schedule('*/15 * * * *', async () => {
  try {
    // Make an HTTP request to the health check endpoint
    const response = await axios.get('https://giti-estate.onrender.com//health');
    // Log the response data
    console.log('Health check response:', response.data);
  } catch (error) {
    // Log any errors that occur during the health check
    console.error('Error during health check:', error.message);
  }
});
