import axios from "axios";
import prisma from "../_configs/db.config";
import env from "../_configs/env.config";

class SongRepository {
    // 노래 추가
    async createSong(
        addedById: number,
        playlistId: number,
        title: string,
        youtubeUrl: string,
        order: number,
    ): Promise<number> {
        const newSong = await prisma.song.create({
            data: {
                title,
                youtubeUrl,
                order,
                addedBy: {
                    connect: {
                        id: addedById,
                    },
                },
                playlist: {
                    connect: {
                        id: playlistId,
                    },
                },
            },
        });

        return newSong.id;
    }

    // YouTube Url에 해당하는 영상의 제목 가져오기
    async findTitleByUrl(youtubeUrl: string): Promise<string> {
        const videoIdMatch = youtubeUrl.match(/[\w-]{11}/);
        const videoId = videoIdMatch ? videoIdMatch[0] : null;
        if (!videoId) return "?????";

        const response = await axios.get(
            `https://www.googleapis.com/youtube/v3/videos`,
            {
                params: {
                    part: "snippet",
                    id: videoId,
                    key: env.youtube.key,
                },
            },
        );

        return response.data.items[0]?.snippet?.title || "?????";
    }

    // 플레이리스트 총 노래 수
    async totalSongs(playlistId: number): Promise<number> {
        const totalSongs = await prisma.song.count({
            where: {
                playlistId,
            },
        });

        return totalSongs;
    }
}

export default SongRepository;
