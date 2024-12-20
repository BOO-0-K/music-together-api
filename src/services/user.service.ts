import { CustomHttpException } from "../_commons/constants/exception.constants";
import Exception from "../_commons/utils/exception";
import env from "../_configs/env.config";
import UserRepository from "../repositories/user.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TokenDto } from "../dtos/user.dto";

class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * 회원가입
     * @param username string
     * @param email string
     * @param password string
     * @returns TokenDto
     */
    async signup(
        username: string,
        email: string,
        password: string,
    ): Promise<TokenDto> {
        // 사용자 중복 체크 (이메일)
        const existingEmail = await this.userRepository.findByEmail(email);
        if (existingEmail) {
            throw new Exception(
                CustomHttpException["CONFLICT_EMAIL"].statusCode,
                CustomHttpException["CONFLICT_EMAIL"].message,
            );
        }

        // 사용자 중복 체크 (사용자 이름)
        const existingUsername =
            await this.userRepository.findByEmail(username);
        if (existingUsername) {
            throw new Exception(
                CustomHttpException["CONFLICT_USERNAME"].statusCode,
                CustomHttpException["CONFLICT_USERNAME"].message,
            );
        }

        // 회원 생성
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await this.userRepository.createUser(
            username,
            email,
            hashedPassword,
        );

        // JWT 토큰 생성
        if (!env.jwt.secret) {
            throw new Error("JWT Errors");
        }
        const payload = { id: user.id };
        const token = jwt.sign(payload, env.jwt.secret, {
            expiresIn: env.jwt.expiresIn,
        });

        return { token };
    }
}

export default UserService;
