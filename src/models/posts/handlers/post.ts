import {Request, Response} from "express";
import {postsRepository} from "../repositories/db-repository";
import {RequestEntityId} from "../../../core/types";
import {HTTP_STATUS_CODES} from "../../../core/constants/http-status-codes";
import {PostInputModel} from "../types/post.input.model";

export const createPostHandler = async (req: Request<RequestEntityId, PostInputModel>, res: Response) => {
    const post = await postsRepository.create(req.body);
    res
        .status(HTTP_STATUS_CODES.CREATED_201)
        .send(post)
}