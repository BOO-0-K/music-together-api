import jwt from "jsonwebtoken";
import {
    Request as ExpressRequest,
    Response as ExpressResponse,
    NextFunction as ExpressNextFunction,
} from "express";
import env from "../../_configs/env.config";
import Exception from "../utils/exception";
import { CustomHttpException } from "../constants/exception.constants";

const protectorMiddleware = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: ExpressNextFunction,
) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        throw new Exception(
            CustomHttpException["FORBIDDEN_ACCOUNT"].statusCode,
            CustomHttpException["FORBIDDEN_ACCOUNT"].message,
        );
    }

    if (!env.jwt.secret) {
        throw new Error("JWT Errors");
    }

    jwt.verify(token, env.jwt.secret, (err, user) => {
        if (err) {
            throw new Exception(
                CustomHttpException["FORBIDDEN_ACCOUNT"].statusCode,
                CustomHttpException["FORBIDDEN_ACCOUNT"].message,
            );
        }

        res.locals.user = user;
        next();
    });
};

export default protectorMiddleware;
