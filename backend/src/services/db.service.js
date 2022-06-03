import { db } from '../config/db.config';
import { MongoClient } from 'mongodb';

const mongoDB = db.mongoURI;
export const dbConnect = async () => {
    const client = await MongoClient.connect(mongoDB, { useNewUrlParser: true });
    return client.db('my-blog');
};