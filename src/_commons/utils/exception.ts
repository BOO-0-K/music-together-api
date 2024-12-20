class Exception extends Error {
    statusCode: number;

    constructor(statusCode: number = 500, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default Exception;
