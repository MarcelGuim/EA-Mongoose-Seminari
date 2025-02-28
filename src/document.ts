import { Schema, model } from 'mongoose';
import { ObjectId } from 'mongodb';

// 1. Create an interface representing a TS object.
export interface IDocument {
  name: string;
  author: String;
  title: string;
  _id?: string;
}

// 2. Create a Schema corresponding to the document in MongoDB.
const documentSchema = new Schema<IDocument>({
  name: {type: String, required: true},
  author: { type: String, required: true },
  title: {type: String, required: true}
});

// 3. Create a Model.
export const DocumentModel = model('Document', documentSchema);