import {Request, Response} from 'express'
import {blogsRepository} from "../repository";

export const getBlogsHandler = (req: Request, res: Response) => {
    res.send(blogsRepository.getAll())
}