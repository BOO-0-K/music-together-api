import { Router } from "express";
import asyncHandler from "express-async-handler";
import SongController from "../controllers/song.controller";
import SongRepository from "../repositories/song.repository";
import SongService from "../services/song.service";
import protectorMiddleware from "../_commons/middlewares/protector.middleware";
import validationMiddleware from "../_commons/middlewares/validation.middleware";
import { SongRequestDto } from "../dtos/song.dto";

// 의존성 주입
const songRepository = new SongRepository();
const songService = new SongService(songRepository);
const songController = new SongController(songService);

// 라우팅 설정
const router = Router();

/**
 * POST /songs
 * 노래 추가
 */
router.post(
    "/",
    protectorMiddleware,
    validationMiddleware(SongRequestDto),
    asyncHandler(songController.addSong),
);

export default router;
