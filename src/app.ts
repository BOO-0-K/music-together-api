import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`🚀 ${PORT}번 포트에서 서버가 정상적으로 실행 중입니다.`);
});
