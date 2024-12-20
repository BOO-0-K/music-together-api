class Exception extends Error {
    statusCode: number;
    data?: object;

    constructor(statusCode: number = 500, message: string, data?: object) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }
}

export default Exception;
