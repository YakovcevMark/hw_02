import {Request, Response} from "express";
import {postsRepository} from "../repository";
import {RequestEntityId} from "../../../core/types";
import {HTTP_STATUS_CODES} from "../../../core/constants/http-status-codes";

export const getPostByIdHandler = (req: Request<RequestEntityId>, res: Response) => {
    const post = postsRepository.getById(req.params.id);
    if (!post) {
        res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND_404)
    } else {
        res.send(post);
    }
}