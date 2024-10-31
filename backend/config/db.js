// Using ES6 imports
import mongoose from 'mongoose';

export const connectDb = async () => await mongoose.connect(process.env.DB_URI);