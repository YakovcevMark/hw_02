import {body} from "express-validator";

export const validationMessages = {
    required: "This field is required",
    url: "This field should be a url",
    stringField: "This field should be a string",
    numericString: "This field should be a numeric string",
    stringMaxLength: (length: number) => `This field should be be a maximum of ${length} characters long`,
    stringMinLength: (length: number) => `This field should be at least ${length} characters long`,
}
type StringValidation = { name: string, max?: number, min?: number }

export const stringValidation = ({name, max, min}: StringValidation) => {
    const scheme = body(name)
        .exists().withMessage(validationMessages.required)
        .isString().withMessage(validationMessages.stringField);
    if (max) {
        scheme
            .isLength({max}).withMessage(validationMessages.stringMaxLength(max))
    }
    if (min) {
        scheme
            .isLength({min}).withMessage(validationMessages.stringMinLength(min))
    }
    return scheme;
}

export const idValidation = (props: StringValidation) => stringValidation(props)
    .isNumeric().withMessage(validationMessages.numericString)

export const urlValidation = (props: StringValidation) => stringValidation(props)
    .isURL().withMessage(validationMessages.url)
