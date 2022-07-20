import { Document, Model } from 'mongoose';
import { type } from 'os';
import { ITest } from '../../interfaces/ITest';

declare global {
  namespace Express {
    export interface Request {
    }    
  }

  namespace Models {
    export type testModel = Model<ITest & Document>
  }
}
