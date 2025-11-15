import {BlogViewModel} from "../types/blog.view.model";
import {BlogInputModel} from "../types/blog.input.model";


class BlogsRepository {

    private db: BlogViewModel[] = []

    public  getAll = async ():Promise<BlogViewModel[]> => {
        return this.db;
    }

    public  isPersistInDb = async (id: string): Promise<boolean> => {
       return this.db.some(blog => blog.id === id);
    }

    public  getById = async (id: string): Promise<BlogViewModel | undefined> => {
        return this.db.find(blog => blog.id === id);
    }

    public  create = async (body: BlogInputModel): Promise<BlogViewModel> => {
        const entity = {
            id: String(+new Date()),
            createdAt: new Date().toISOString(),
            isMembership:true,
            ...body,
        }
        this.db.push(entity);
        return entity
    }

    public  update = async (id: string, body: BlogInputModel): Promise<boolean> => {
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

    public  remove = async (id: string): Promise<boolean> => {
        const initLength = this.db.length;
        this.db = this.db.filter(blog => blog.id !== id);
        const resultLength = this.db.length;
        return initLength > resultLength;
    }

    public  clearDB = async () => {
        this.db = [];
    }

}


const blogsRepository = new BlogsRepository();

export {
    blogsRepository,
};