import {BlogViewModel} from "./types/blog.view.model";
import {BlogInputModel} from "./types/blog.input.model";


class BlogsRepository {

    private db: BlogViewModel[] = []

    public getAll = () => {
        return this.db;
    }

    public isPersistInDb = (id: string) => {
       return this.db.some(blog => blog.id === id);
    }

    public getById = (id: string) => {
        return this.db.find(blog => blog.id === id);
    }

    public create = (body: BlogInputModel) => {
        const entity = {
            id: String(+new Date()),
            ...body,
        }
        this.db.push(entity);
        return entity
    }

    public update = (id: string, body: BlogInputModel): boolean => {
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


const blogsRepository = new BlogsRepository();

export {
    blogsRepository,
};