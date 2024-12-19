import express from "express";
import env from "./_configs/env.config";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import exceptionMiddleware from "./_commons/middlewares/exception.middleware";
import Response from "./_commons/utils/response";
import Exception from "./_commons/utils/exception";

const PORT = env.port ?? 3000;

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));
app.use(logger("dev"));

const router = express.Router();
router.get("/test-error", (req, res) => {
    throw new Exception("사용자 정의 예외 상황 발생!", 400); // 사용자 정의 예외
});
router.get("/test-unexpected-error", (req, res) => {
    throw new Error("일반 예외 상황 발생!"); // 일반 예외
});
router.get("/test-success", (req, res) => {
    Response.send(res, "성공했습니다.", 200, {
        data: "Test Passed",
    }); // 성공
});
app.use(router);

app.use(exceptionMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 ${PORT}번 포트에서 서버가 정상적으로 실행 중입니다.`);
});
