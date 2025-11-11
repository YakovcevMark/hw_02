import {Request, Response} from 'express'
import {postsRepository} from "../repository";

export const getPostsHandler = (req: Request, res: Response) => {
    res.send(postsRepository.getAll())
}