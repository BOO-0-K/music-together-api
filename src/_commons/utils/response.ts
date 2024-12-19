import { Response as ExpressResponse } from "express";

interface IResponse {
    statusCode: number;
    message: string;
    data?: object;
}

class Response {
    static send(
        res: ExpressResponse,
        message: string,
        statusCode: number = 200,
        data?: object,
    ): void {
        const response: IResponse = {
            statusCode,
            message,
            data,
        };

        res.status(statusCode).json(response);
    }
}

export default Response;
