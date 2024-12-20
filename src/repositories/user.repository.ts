import { User } from "@prisma/client";
import prisma from "../_configs/db.config";

class UserRepository {
    // 사용자 이메일로 회원 찾기
    async findByEmail(email: string) {
        const user = await prisma.user.findFirst({ where: { email } });

        return user;
    }

    // 사용자 이름으로 회원 찾기
    async checkUserAccess(username: string) {
        const user = await prisma.user.findFirst({ where: { username } });

        return user;
    }

    // 회원 생성
    async createUser(
        username: string,
        email: string,
        password: string,
    ): Promise<User> {
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password,
            },
        });

        return newUser;
    }
}

export default UserRepository;
