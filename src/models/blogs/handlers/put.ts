import {Request, Response} from "express";
import {blogsRepository} from "../repository";
import {RequestEntityId} from "../../../core/types";
import {HTTP_STATUS_CODES} from "../../../core/constants/http-status-codes";
import {BlogInputModel} from "../types/blog.input.model";

export const updateBlogHandler = (req: Request<RequestEntityId, BlogInputModel>, res: Response) => {
    const isUpdated = blogsRepository.update(req.params.id, req.body);
    res.sendStatus(
        isUpdated
            ? HTTP_STATUS_CODES.NO_CONTENT_204
            : HTTP_STATUS_CODES.NOT_FOUND_404
    )
}