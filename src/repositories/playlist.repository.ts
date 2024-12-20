import prisma from "../_configs/db.config";
import { PlaylistDto } from "../dtos/playlist.dto";

class PlaylistRepository {
    // 플레이리스트 추가
    async createPlaylist(
        creatorId: number,
        name: string,
        description: string,
    ): Promise<number> {
        const newPlaylist = await prisma.playlist.create({
            data: {
                name,
                description,
                creator: {
                    connect: {
                        id: creatorId,
                    },
                },
            },
        });

        return newPlaylist.id;
    }

    // 모든 플레이리스트 목록 조회
    async findAllPlaylists(creatorId: number): Promise<Array<PlaylistDto>> {
        const playlists = await prisma.playlist.findMany({
            where: {
                isDeleted: false,
                creator: {
                    id: creatorId,
                },
            },
            include: {
                creator: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const result = await playlists.map((playlist) => {
            return {
                id: playlist.id,
                userId: playlist.creatorId,
                username: playlist.creator.username,
                name: playlist.name,
                description: playlist.description,
                createdAt: playlist.createdAt,
                updatedAt: playlist.updatedAt,
            };
        });

        return result;
    }

    // 플레이리스트 상세 조회
    async findOnePlaylist(id: number) {
        const playlist = await prisma.playlist.findFirst({
            where: {
                id,
                isDeleted: false,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true,
                    },
                },
                songs: {
                    select: {
                        id: true,
                        title: true,
                        youtubeUrl: true,
                        isDeleted: true,
                        order: true,
                        addedBy: {
                            select: {
                                id: true,
                                username: true,
                            },
                        },
                    },
                },
            },
        });

        if (!playlist) {
            return null;
        }

        return {
            id: playlist.id,
            creator: playlist.creator,
            name: playlist.name,
            description: playlist.description,
            songs: playlist.songs,
            createdAt: playlist.createdAt,
            updatedAt: playlist.updatedAt,
        };
    }
}

export default PlaylistRepository;
