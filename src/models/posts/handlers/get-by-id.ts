import {Request, Response} from "express";
import {postsRepository} from "../repositories/db-repository";
import {RequestEntityId} from "../../../core/types";
import {HTTP_STATUS_CODES} from "../../../core/constants/http-status-codes";

export const getPostByIdHandler = async (req: Request<RequestEntityId>, res: Response) => {
    const post = await postsRepository.getById(req.params.id);
    if (!post) {
        res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND_404)
    } else {
        res.send(post);
    }
}