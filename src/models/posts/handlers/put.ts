import {Request, Response} from "express";
import {postsRepository} from "../repository";
import {RequestEntityId} from "../../../core/types";
import {HTTP_STATUS_CODES} from "../../../core/constants/http-status-codes";
import {PostInputModel} from "../types/post.input.model";

export const updatePostHandler = (req: Request<RequestEntityId, PostInputModel>, res: Response) => {
    const isUpdated = postsRepository.update(req.params.id, req.body);
    res.sendStatus(
        isUpdated
            ? HTTP_STATUS_CODES.NO_CONTENT_204
            : HTTP_STATUS_CODES.NOT_FOUND_404
    )
}