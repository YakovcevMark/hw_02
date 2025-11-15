import {Request, Response} from 'express'
import {postsRepository} from "../repositories/db-repository";

export const getPostsHandler = async (req: Request, res: Response) => {
    const posts = await postsRepository.getAll();
    res.send(posts)
}