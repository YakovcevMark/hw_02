import {PostViewModel} from "../types/post.view.model";
import {PostInputModel} from "../types/post.input.model";
import {postsCollection} from "../../../db-settings";
import {ObjectId} from "mongodb";
import {getMongoViewModel} from "../../../core/utils/get-view-model";
import {blogsRepository} from "../../blogs/repositories/db-repository";


class PostsRepository {

    public getAll = async (): Promise<PostViewModel[]> => {
        const postsList = await postsCollection.find().toArray()
        return postsList.map(getMongoViewModel);
    }

    public isPersistInDb = async (id: string): Promise<boolean> => {
        const postsList = await postsCollection.find({id}).toArray();
        return postsList.length > 0;
    }

    public getById = async (id: string): Promise<PostViewModel | undefined> => {
        const post = await postsCollection.findOne({_id: new ObjectId(id)})
        if (!post) {
            return
        } else {
            return getMongoViewModel(post);
        }
    }

    public create = async (body: PostInputModel): Promise<PostViewModel> => {
        const blog = await blogsRepository.getById(body.blogId);
        const entity = {
            id: String(+new Date()),
            blogName: blog!.name,
            createdAt: new Date().toString(),
            ...body,
        }
        const result = await postsCollection.insertOne(entity);
        return getMongoViewModel({...entity, _id: result.insertedId});
    }

    public update = async (id: string, body: PostInputModel): Promise<boolean> => {

        const post = await postsCollection.findOne({_id: new ObjectId(id)});

        if (!post) {
            return false;
        } else {
            await postsCollection.updateOne(
                {
                    _id: new ObjectId(id)
                },
                {
                    ...post,
                    ...body
                }
            );
            return true;
        }
    }

    public remove = async (id: string): Promise<boolean> => {
        const response = await postsCollection.deleteOne({_id: new ObjectId(id)});
        return response.deletedCount > 0
    }

    public clearDB = async () => {
        await postsCollection.deleteMany()
    }

}


const postsRepository = new PostsRepository();

export {
    postsRepository,
};