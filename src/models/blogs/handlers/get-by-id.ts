import {Request, Response} from "express";
import {blogsRepository} from "../repository";
import {RequestEntityId} from "../../../core/types";
import {HTTP_STATUS_CODES} from "../../../core/constants/http-status-codes";

export const getBlogByIdHandler = (req: Request<RequestEntityId>, res: Response) => {
    const blog = blogsRepository.getById(req.params.id);
    if (!blog) {
        res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND_404)
    } else {
        res.send(blog);
    }
}