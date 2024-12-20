import { CustomHttpException } from "../_commons/constants/exception.constants";
import Exception from "../_commons/utils/exception";
import Util from "../_commons/utils/util";
import { SongIdDto } from "../dtos/song.dto";
import SongRepository from "../repositories/song.repository";

class SongService {
    private songRepository: SongRepository;

    constructor(songRepository: SongRepository) {
        this.songRepository = songRepository;
    }

    async addSong(
        userId: number,
        playlistId: number,
        youtubeUrl: string,
    ): Promise<SongIdDto> {
        if (!Util.isValidYoutubeUrl(youtubeUrl)) {
            throw new Exception(
                CustomHttpException["BAD_REQUEST"].statusCode,
                CustomHttpException["BAD_REQUEST"].message,
            );
        }

        const title = await this.songRepository.findTitleByUrl(youtubeUrl);
        const order = (await this.songRepository.totalSongs(playlistId)) + 1;

        const songId = await this.songRepository.createSong(
            userId,
            playlistId,
            title,
            youtubeUrl,
            order,
        );

        return { id: songId };
    }
}

export default SongService;
