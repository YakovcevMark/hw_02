import {Router} from "express";
import {getBlogsHandler} from "./handlers/get";
import {getBlogByIdHandler} from "./handlers/get-by-id";
import {createBlogHandler} from "./handlers/post";
import {updateBlogHandler} from "./handlers/put";
import {deleteBlogHandler} from "./handlers/delete";
import {blogValidationMiddleware} from "./validation/blog.dto.validation";
import {inputValidationResultMiddleware} from "../../middleware/input-validation-result-middleware";
import {superAdminGuardMiddleware} from "../../middleware/super-admin-guard-middleware";

const blogsRouter = Router()

blogsRouter.get('', getBlogsHandler)
blogsRouter.get('/:id', getBlogByIdHandler)
blogsRouter.post('', superAdminGuardMiddleware, blogValidationMiddleware, inputValidationResultMiddleware, createBlogHandler)
blogsRouter.put('/:id', superAdminGuardMiddleware, blogValidationMiddleware, inputValidationResultMiddleware, updateBlogHandler)
blogsRouter.delete('/:id', superAdminGuardMiddleware, deleteBlogHandler)

export {blogsRouter};