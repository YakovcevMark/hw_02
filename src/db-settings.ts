import dotenv from 'dotenv';
import {MongoClient} from "mongodb";
import {BlogViewModel} from "./models/blogs/types/blog.view.model";
import {PostViewModel} from "./models/posts/types/post.view.model";

dotenv.config();

const mongo_url = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const db_name = process.env.DB_NAME || 'dev'

const client = new MongoClient(mongo_url);
const db = client.db(db_name);

export const blogsCollection = db.collection<BlogViewModel>("blogs");
export const postsCollection = db.collection<PostViewModel>("posts");

export async function connectToDatabase() {
    try {
        await client.connect();
        console.log(`Successfully connected to database: ${db_name}`);
    } catch (error) {
        await client.close();
        throw new Error('Don\'t connected to db');
    }
}