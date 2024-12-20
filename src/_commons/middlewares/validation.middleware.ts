import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {
    NextFunction as ExpressNextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import Exception from "../utils/exception";
import { CustomHttpException } from "../constants/exception.constants";

const validationMiddleware = (dtoClass: any) => {
    return async (
        req: ExpressRequest,
        res: ExpressResponse,
        next: ExpressNextFunction,
    ) => {
        try {
            const dtoInstance = plainToInstance(dtoClass, req.body);

            const errors = await validate(dtoInstance);

            if (errors.length > 0) {
                const errs = errors.map((error) => {
                    return {
                        field: error.property,
                        errors: Object.values(error.constraints || {}),
                    };
                });

                throw new Exception(
                    CustomHttpException["BAD_REQUEST"].statusCode,
                    CustomHttpException["BAD_REQUEST"].message,
                    { errors: errs },
                );
            }

            req.body = dtoInstance;
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default validationMiddleware;
