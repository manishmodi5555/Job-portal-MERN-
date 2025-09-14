
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jobportal';

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGODB_URI, {
    dbName: MONGODB_URI.split('/').pop(),
  });
  console.log('MongoDB connected');
};

export default connectDB;
