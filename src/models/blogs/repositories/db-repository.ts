import {BlogViewModel} from "../types/blog.view.model";
import {BlogInputModel} from "../types/blog.input.model";
import {blogsCollection} from "../../../db-settings";
import {ObjectId, WithId} from "mongodb";
import {getMongoViewModel} from "../../../core/utils/get-view-model";


class BlogsRepository {

    public getAll = async (): Promise<BlogViewModel[]> => {
        const blogsList = await blogsCollection.find().toArray()
        return blogsList.map(getMongoViewModel);
    }

    public isPersistInDb = async (id: string): Promise<boolean> => {
        const blogsList = await blogsCollection.find({id}).toArray();
        return blogsList.length > 0;
    }

    public getById = async (id: string): Promise<BlogViewModel | undefined> => {
        const blog = await blogsCollection.findOne({_id: new ObjectId(id)})
        if (!blog) {
            return
        } else {
            return getMongoViewModel(blog);
        }
    }

    public create = async (body: BlogInputModel): Promise<BlogViewModel> => {
        const entity = {
            id: String(+new Date()),
            createdAt: new Date().toISOString(),
            isMembership: true,
            ...body,
        }
        const result = await blogsCollection.insertOne(entity);
        return getMongoViewModel({...entity, _id: result.insertedId});
    }

    public update = async (id: string, body: BlogInputModel): Promise<boolean> => {

        const blog = await blogsCollection.findOne({_id: new ObjectId(id)});

        if (!blog) {
            return false;
        } else {
            await blogsCollection.updateOne(
                {
                    _id: new ObjectId(id)
                },
                {
                    ...blog,
                    ...body
                }
            );
            return true;
        }
    }

    public remove = async (id: string): Promise<boolean> => {
        const response = await blogsCollection.deleteOne({_id: new ObjectId(id)});
        return response.deletedCount > 0
    }

    public clearDB = async () => {
        await blogsCollection.deleteMany()
    }

}


const blogsRepository = new BlogsRepository();

export {
    blogsRepository,
};