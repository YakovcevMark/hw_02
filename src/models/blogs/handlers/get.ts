import {Request, Response} from 'express'
import {blogsRepository} from "../repositories/db-repository";

export const getBlogsHandler = async (req: Request, res: Response) => {
    const blogs = await blogsRepository.getAll();
    res.send(blogs)
}