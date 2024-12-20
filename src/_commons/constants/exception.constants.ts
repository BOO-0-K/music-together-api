export const CustomHttpException = {
    BAD_REQUEST: {
        statusCode: 400,
        code: "BAD_REQUEST",
        message: "잘못된 접근입니다.",
    },
    UNAUTHORIZED_ACCOUNT: {
        statusCode: 401,
        code: "UNAUTHORIZED_ACCOUNT",
        message: "잘못된 아이디 또는 패스워드입니다.",
    },
    FORBIDDEN_ACCOUNT: {
        statusCode: 403,
        code: "FORBIDDEN_ACCOUNT",
        message: "해당 계정의 접근 권한이 없습니다.",
    },
    NOT_FOUND: {
        statusCode: 404,
        code: "NOT_FOUND",
        message: "요청한 내용을 찾을 수 없습니다.",
    },
    CONFLICT_EMAIL: {
        statusCode: 409,
        code: "CONFLICT_EMAIL",
        message: "이미 사용중인 이메일입니다.",
    },
    CONFLICT_USERNAME: {
        statusCode: 409,
        code: "CONFLICT_USERNAME",
        message: "이미 사용중인 사용자명입니다.",
    },
    DB_SERVER_ERROR: {
        statusCode: 500,
        code: "DB_SERVER_ERROR",
        message: "알 수 없는 오류입니다. 관리자에게 문의해주세요.",
    },
};
