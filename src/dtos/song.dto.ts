import { IsNotEmpty, IsNumber, IsString } from "class-validator";

// 노래 아이디 DTO
export class SongIdDto {
    id: number;
}

// 노래 추가 요청 DTO
export class SongRequestDto {
    @IsNumber()
    @IsNotEmpty()
    playlistId: number;

    @IsString()
    @IsNotEmpty()
    youtubeUrl: string;
}
