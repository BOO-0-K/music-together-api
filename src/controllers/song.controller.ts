import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import SongService from "../services/song.service";
import Response from "../_commons/utils/response";
import { CustomHttpSuccess } from "../_commons/constants/success.constants";

class SongController {
    private songService: SongService;

    constructor(songService: SongService) {
        this.songService = songService;
    }

    // 노래 추가
    addSong = async (req: ExpressRequest, res: ExpressResponse) => {
        const user = res.locals.user;
        const { playlistId, youtubeUrl } = req.body;

        const songId = await this.songService.addSong(
            +user.id,
            +playlistId,
            youtubeUrl,
        );

        Response.send(res, 201, CustomHttpSuccess["ADD_SONG_SUCCESS"], songId);
    };
}

export default SongController;
