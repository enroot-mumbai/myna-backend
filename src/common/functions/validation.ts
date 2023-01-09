import { validator } from "./validate";

export function validateRules(
    body: any,
    validationRule: object,
    allowExtraFields: boolean = false,
    customErrorMessage: object = {}
): Promise<void> {
    return new Promise((resolve, reject) => {
        validator(
            body,
            validationRule,
            allowExtraFields,
            customErrorMessage,
            (err: object, status: boolean) => {
                if (!status) {
                    err = {
                        ...err,
                        customMessage: "Request body Validation Error",
                        statusCode: 409,
                    };
                    

                    reject(err);
                }
                resolve();
            }
        );
    });
}