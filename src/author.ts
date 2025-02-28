import { ObjectId, Schema, model } from 'mongoose';

// 1. Create an interface representing a TS object.
export interface IAuthor {
  name: string;
  surname: string;
  documents: ObjectId[];
}

// 2. Create a Schema corresponding to the document in MongoDB.
const authorSchema = new Schema<IAuthor>({
  name: { type: String, required: true },
  surname: {type: String, required: true},
  documents: [{ type: Schema.Types.ObjectId, ref: 'document' }],
});

// 3. Create a Model.
export const AuthorModel = model('Author', authorSchema);