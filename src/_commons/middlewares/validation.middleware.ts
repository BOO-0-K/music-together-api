import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {
    NextFunction as ExpressNextFunction,
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import Response from "../utils/response";

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

                Response.send(res, 400, "잘못된 접근입니다.", { errors: errs });
            }

            req.body = dtoInstance;
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default validationMiddleware;
