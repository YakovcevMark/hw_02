import {idValidation, stringValidation, urlValidation} from "../../../core/validation";
import {blogsRepository} from "../../blogs/repository";

export const postValidationMiddleware = [
    stringValidation({name: 'title', min: 1, max: 30}),
    stringValidation({name: 'shortDescription', min: 1, max: 100}),
    stringValidation({name: 'content', min: 1, max: 1000}),
    idValidation({name: 'blogId'}).custom((value) => blogsRepository.isPersistInDb(String(value))).withMessage('Blog with that id does not exist'),
]