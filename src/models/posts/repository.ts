import {PostViewModel} from "./types/post.view.model";
import {PostInputModel} from "./types/post.input.model";
import {blogsRepository} from "../blogs/repository";

class PostsRepository {

    private db: PostViewModel[] = []

    public getAll = () => {
        return this.db;
    }

    public getById = (id: string) => {
        return this.db.find(blog => blog.id === id);
    }

    public create = (body: PostInputModel) => {
        const blog = blogsRepository.getById(body.blogId);
        const entity = {
            id: String(+new Date()),
            blogName: blog!.name,
            ...body,
        }
        this.db.push(entity);
        return entity
    }

    public update = (id: string, body: PostInputModel): boolean => {
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

    public remove = (id: string): boolean => {
        const initLength = this.db.length;
        this.db = this.db.filter(blog => blog.id !== id);
        const resultLength = this.db.length;
        return initLength > resultLength;
    }

    public clearDB = () => {
        this.db = [];
    }

}

const postsRepository = new PostsRepository();
export {postsRepository};