import express from "express";
import env from "./_configs/env.config";
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import exceptionMiddleware from "./_commons/middlewares/exception.middleware";
import userRouter from "./routers/user.router";
import playlistRouter from "./routers/playlist.router";
import songRouter from "./routers/song.router";

const PORT = env.port ?? 3000;

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));
app.use(logger("dev"));

// 라우터 설정
app.use("/users", userRouter);
app.use("/playlists", playlistRouter);
app.use("/songs", songRouter);

// 에러 핸들링
app.use(exceptionMiddleware);

app.listen(PORT, () => {
    console.log(`🚀 ${PORT}번 포트에서 서버가 정상적으로 실행 중입니다.`);
});
