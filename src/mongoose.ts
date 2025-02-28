import mongoose from 'mongoose';
import { UserModel, IUser } from './user.js';
import { AuthorModel, IAuthor } from './author.js';
import { DocumentModel, IDocument } from './document.js';
import { ObjectId } from 'mongoose';


async function main() {
  mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

  await mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar:', err));

  const user1:  IUser = {
    "name": 'Bill',
    "email": 'bill@initech.com',
    "avatar": 'https://i.imgur.com/dM7Thhn.png'
  };

  const document1: IDocument = {
    "name": "telecos",
    "author": "Marcel",
    "title": "telecos mola"
  }
  const newDocument1 = new DocumentModel(document1)
  const document1Saved = await newDocument1.save();

  const document2: IDocument = {
    "name": "aeros",
    "author": "Marcel",
    "title": "aeros mola"
  }
  const newDocument2 = new DocumentModel(document2)
  const document2Saved = await newDocument2.save();

  const document3: IDocument = {
    "name": "first",
    "author": "Marco",
    "title": "first mola"
  }
  const newDocument3 = new DocumentModel(document3)
  const document3Saved = await  newDocument3.save();

  const document4: IDocument = {
    "name": "telecos",
    "author": "Marco",
    "title": "second mola"
  }
  const newDocument4 = new DocumentModel(document4)
  const document4Saved = await newDocument4.save();
  
  const documents: ObjectId[] = [document1Saved.id, document2Saved.id];

  const author1: IAuthor = {
    "name": "Marcel",
    "surname": "Guim",
    "documents": documents
  };
  const newAuthor1 = new AuthorModel(author1)
  await newAuthor1.save();

  const documents2: ObjectId[] = [document1Saved.id, document3Saved.id, document4Saved.id];

  const author2: IAuthor = {
    "name": "Marco",
    "surname": "Polo",
    "documents": documents2
  }
  const newAuthor2 = new AuthorModel(author2)
  await newAuthor2.save();

  console.log("user1", user1); 
  const newUser= new UserModel(user1);
  const user2: IUser = await newUser.save();
  console.log("user2",user2);

  // findById devuelve un objeto usando el _id.
  const user3: IUser | null = await UserModel.findById(user2._id);
  console.log("user3",user3);

  // findOne devuelve un objeto usando un filtro.
  const user4: IUser | null = await UserModel.findOne({name: 'Bill'});
  console.log("user4",user4);

  // Partial<IUser> Indica que el objeto puede tener solo algunos campos de IUser.
  // select('name email') solo devuelve name y email.
  // lean() devuelve un objeto plano de JS en lugar de un documento de Mongoose.
  const user5: Partial<IUser> | null  = await UserModel.findOne({ name: 'Bill' })
    .select('name email').lean();
  console.log("user5",user5);

  //CRUD Create ja està fet

  //READ:
  const author1FromDatabase = await AuthorModel.findOne({name: "Marcel"});
  console.log("from the CRUD Read we have the author: " + author1FromDatabase);

  //DELETE:
  const author2FromDatabase = await AuthorModel.findOneAndRemove({name: "Marcel"});
  console.log("This user is no longer in the database: " +author2FromDatabase);

  //EDIT
  const newAuthor3 = new AuthorModel(author1)
  const x = await newAuthor3.save();
  const author4: IAuthor = {
    "name": "Marcel",
    "surname": "GuiIIIIIIIIIIIIIIIIM",
    "documents": documents,
  };
  const author5FromDataBase = await AuthorModel.findOneAndReplace({name: "Marcel"}, author4);
  console.log("The modified user is now: "+author5FromDataBase);
  //List
  const authorsFromDataBase = await AuthorModel.find()
  console.log("All the authors are: " +authorsFromDataBase)

  const authorFinal = await AuthorModel.aggregate([{$match: {$expr: { $gt: [{ $size: "$documents" },2]}}}]);
  const names = authorFinal.map((authorFinal) => authorFinal.name);
  console.log("the authors with more than 2 publications are: " + names);
}

main()

    
