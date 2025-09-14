
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  resumePath: { type: String, default: null }, // latest uploaded resume path
}, { timestamps: true });

export default mongoose.model('User', userSchema);
