export type FieldError = {
    field: string;
    message: string;
}

export type APIErrorResult = {
    errorsMessages: FieldError[];
}