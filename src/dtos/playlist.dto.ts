import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

// 플레이리스트 아이디 DTO
export class PlaylistIdDto {
    id: number;
}

// 플레이리스트 DTO
export class PlaylistDto {
    id: number;
    userId: number;
    username: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
}

// 플레이리스트 추가 요청 DTO
export class PlaylistRequestDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string; // 이름

    @IsString()
    @IsOptional()
    @MaxLength(1000)
    description: string; // 설명
}
