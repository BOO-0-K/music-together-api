import { Router } from "express";
import asyncHandler from "express-async-handler";
import PlaylistRepository from "../repositories/playlist.repository";
import PlaylistService from "../services/playlist.service";
import PlaylistController from "../controllers/playlist.controller";
import protectorMiddleware from "../_commons/middlewares/protector.middleware";
import validationMiddleware from "../_commons/middlewares/validation.middleware";
import { PlaylistRequestDto } from "../dtos/playlist.dto";

// 의존성 주입
const playlistRepository = new PlaylistRepository();
const playlistService = new PlaylistService(playlistRepository);
const playlistController = new PlaylistController(playlistService);

// 라우팅 설정
const router = Router();

/**
 * GET /playlists
 * 플레이리스트 목록 조회
 */
router.get(
    "/",
    protectorMiddleware,
    asyncHandler(playlistController.getPlaylists),
);

/**
 * GET /playlists/:id
 * 플레이리스트 상세 조회
 */
router.get(
    "/:id",
    protectorMiddleware,
    asyncHandler(playlistController.getPlaylist),
);

/**
 * POST /playlists
 * 플레이리스트 추가
 */
router.post(
    "/",
    protectorMiddleware,
    validationMiddleware(PlaylistRequestDto),
    asyncHandler(playlistController.addPlaylist),
);

export default router;
