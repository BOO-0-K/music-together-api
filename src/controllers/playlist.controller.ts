import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import PlaylistService from "../services/playlist.service";
import { PlaylistIdDto } from "../dtos/playlist.dto";
import Response from "../_commons/utils/response";
import { CustomHttpSuccess } from "../_commons/constants/success.constants";

class PlaylistController {
    private playlistService: PlaylistService;

    constructor(playlistService: PlaylistService) {
        this.playlistService = playlistService;
    }

    // 플레이리스트 추가
    addPlaylist = async (req: ExpressRequest, res: ExpressResponse) => {
        const user = res.locals.user;
        const { name, description } = req.body;

        const playlistId: PlaylistIdDto =
            await this.playlistService.addPlaylist(+user.id, name, description);

        Response.send(
            res,
            201,
            CustomHttpSuccess["ADD_PLAYLIST_SUCCESS"],
            playlistId,
        );
    };

    // 플레이리스트 목록 조회
    getPlaylists = async (req: ExpressRequest, res: ExpressResponse) => {
        const user = res.locals.user;

        const playlists = await this.playlistService.getPlaylists(+user.id);

        Response.send(
            res,
            200,
            CustomHttpSuccess["GET_PLAYLISTS_SUCCESS"],
            playlists,
        );
    };

    // 플레이리스트 상세 조회
    getPlaylist = async (req: ExpressRequest, res: ExpressResponse) => {
        const { id } = req.params;

        const playlist = await this.playlistService.getPlaylist(+id);

        Response.send(
            res,
            200,
            CustomHttpSuccess["GET_PLAYLIST_SUCCESS"],
            playlist,
        );
    };
}

export default PlaylistController;
