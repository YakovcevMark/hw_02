import {stringValidation, urlValidation} from "../../../core/validation";

export const blogValidationMiddleware = [
    stringValidation({name: 'name', min: 1, max: 15}),
    stringValidation({name: 'description', min: 1, max: 500}),
    urlValidation({name: 'websiteUrl', min: 1, max: 100})
]