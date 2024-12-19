import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction as ExpressNextFunction,
} from "express";
import { CustomHttpException } from "../constants/exception.constants";
import Exception from "../utils/exception";
import Response from "../utils/response";

const exceptionMiddleware = (
    err: Error,
    req: ExpressRequest,
    res: ExpressResponse,
    next: ExpressNextFunction,
) => {
    if (err instanceof Exception) {
        Response.send(res, err.message, err.statusCode);
    } else {
        console.log(err.stack);
        Response.send(
            res,
            CustomHttpException["DB_SERVER_ERROR"].message,
            CustomHttpException["DB_SERVER_ERROR"].statusCode,
        );
    }
};

export default exceptionMiddleware;
