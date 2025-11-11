import {APIErrorResult, FieldError} from "../types/error-response-type";

export const createErrorResponse = (errors: FieldError[]): APIErrorResult => {
    return {
        errorsMessages: errors,
    }
}