import {Request, Response} from "express";
import {blogsRepository} from "../repository";
import {RequestEntityId} from "../../../core/types";
import {HTTP_STATUS_CODES} from "../../../core/constants/http-status-codes";

export const deleteBlogHandler = (req: Request<RequestEntityId>, res: Response) => {
    const isRemoved = blogsRepository.remove(req.params.id);
    res.sendStatus(
        isRemoved
            ? HTTP_STATUS_CODES.NO_CONTENT_204
            : HTTP_STATUS_CODES.NOT_FOUND_404
    )
}