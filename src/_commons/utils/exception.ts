class Exception extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number = 500) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default Exception;
