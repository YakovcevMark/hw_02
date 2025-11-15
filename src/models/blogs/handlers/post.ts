import {Request, Response} from "express";
import {blogsRepository} from "../repositories/db-repository";
import {RequestEntityId} from "../../../core/types";
import {HTTP_STATUS_CODES} from "../../../core/constants/http-status-codes";
import {BlogInputModel} from "../types/blog.input.model";

export const createBlogHandler = async (req: Request<RequestEntityId, BlogInputModel>, res: Response) => {
    const blog = await blogsRepository.create(req.body);
    res
        .status(HTTP_STATUS_CODES.CREATED_201)
        .send(blog)
}