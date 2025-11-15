import {Request, Response} from "express";
import {blogsRepository} from "../repositories/db-repository";
import {RequestEntityId} from "../../../core/types";
import {HTTP_STATUS_CODES} from "../../../core/constants/http-status-codes";

export const getBlogByIdHandler = async (req: Request<RequestEntityId>, res: Response) => {
    const blog = await blogsRepository.getById(req.params.id);
    if (!blog) {
        res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND_404)
    } else {
        res.send(blog);
    }
}