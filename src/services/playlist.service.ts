import { CustomHttpException } from "../_commons/constants/exception.constants";
import Exception from "../_commons/utils/exception";
import { PlaylistDto, PlaylistIdDto } from "../dtos/playlist.dto";
import PlaylistRepository from "../repositories/playlist.repository";

class PlaylistService {
    private playlistRepository: PlaylistRepository;

    constructor(playlistRepository: PlaylistRepository) {
        this.playlistRepository = playlistRepository;
    }

    /**
     * 플레이리스트 추가
     * @param userId number
     * @param name string
     * @param description string
     * @returns PlaylistIdDto
     */
    async addPlaylist(
        userId: number,
        name: string,
        description: string,
    ): Promise<PlaylistIdDto> {
        const playlistId: number = await this.playlistRepository.createPlaylist(
            userId,
            name,
            description,
        );
        return { id: playlistId };
    }

    /**
     * 플레이리스트 목록
     * @param userId number
     * @returns object
     */
    async getPlaylists(userId: number) {
        const playlists: Array<PlaylistDto> =
            await this.playlistRepository.findAllPlaylists(userId);
        return { playlists };
    }

    async getPlaylist(id: number) {
        const playlist = await this.playlistRepository.findOnePlaylist(id);

        if (!playlist) {
            throw new Exception(
                CustomHttpException["NOT_FOUND"].statusCode,
                CustomHttpException["NOT_FOUND"].message,
            );
        }

        return { playlist };
    }
}

export default PlaylistService;
