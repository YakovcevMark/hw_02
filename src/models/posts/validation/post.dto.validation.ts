import {idValidation, stringValidation } from "../../../core/validation";
import {blogsRepository} from "../../blogs/repository";

export const postValidationMiddleware = [
    stringValidation({name: 'title', min: 1, max: 30}),
    stringValidation({name: 'shortDescription', min: 1, max: 100}),
    stringValidation({name: 'content', min: 1, max: 1000}),
    idValidation({name: 'blogId'})
        // TODO вынести обработку наличия такого блога в обработчик запроса
        //  \ отдельным middleware
        .custom((value) => blogsRepository.isPersistInDb(String(value)))
        .withMessage('Blog with that id does not exist'),
]