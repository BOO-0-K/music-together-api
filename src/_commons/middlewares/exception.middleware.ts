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
        Response.send(res, err.statusCode, err.message);
    } else {
        console.log(err.stack);
        Response.send(
            res,
            CustomHttpException["DB_SERVER_ERROR"].statusCode,
            CustomHttpException["DB_SERVER_ERROR"].message,
        );
    }
};

export default exceptionMiddleware;
