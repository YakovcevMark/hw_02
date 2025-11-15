import {PostViewModel} from "../types/post.view.model";
import {PostInputModel} from "../types/post.input.model";
import {blogsRepository} from "../../blogs/repositories/memory-repository";

class PostsRepository {

    private db: PostViewModel[] = []

    public getAll = async (): Promise<PostViewModel[]> => {
        return this.db;
    }

    public getById = async (id: string): Promise<PostViewModel | undefined> => {
        return this.db.find(blog => blog.id === id);
    }

    public create = async (body: PostInputModel): Promise<PostViewModel> => {
        const blog = await blogsRepository.getById(body.blogId);
        const entity = {
            id: String(+new Date()),
            blogName: blog!.name,
            createdAt: new Date().toString(),
            ...body,
        }
        this.db.push(entity);
        return entity
    }

    public update = async (id: string, body: PostInputModel): Promise<boolean> => {
        const entityIndex = this.db.findIndex(blog => blog.id === id);
        if (entityIndex === -1) {
            return false;
        } else {
            this.db[entityIndex] = {
                ...this.db[entityIndex],
                ...body,
            }
            return true;
        }
    }

    public remove = async (id: string): Promise<boolean> => {
        const initLength = this.db.length;
        this.db = this.db.filter(blog => blog.id !== id);
        const resultLength = this.db.length;
        return initLength > resultLength;
    }

    public clearDB = async () => {
        this.db = [];
    }

}

const postsRepository = new PostsRepository();
export {postsRepository};