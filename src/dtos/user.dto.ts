import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from "class-validator";

export class TokenDto {
    token: string;
}

export class SignupRequestDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(10)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(4)
    @Matches(/^[a-zA-Z0-9\u3131-\u3163\uac00-\ud7a3]*$/, {
        message: "password only accepts english, korean and number",
    })
    password: string;
}
