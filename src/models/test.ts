import { ITest } from '../interfaces/ITest';
import mongoose from 'mongoose';

const Test = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    }  
  },
  { timestamps: true },
);

export default mongoose.model<ITest & mongoose.Document>('testModel', Test);
