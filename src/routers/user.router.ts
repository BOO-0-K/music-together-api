import { Router } from "express";
import asyncHandler from "express-async-handler";
import UserController from "../controllers/user.controller";
import validationMiddleware from "../_commons/middlewares/validation.middleware";
import { SigninRequestDto, SignupRequestDto } from "../dtos/user.dto";
import UserRepository from "../repositories/user.repository";
import UserService from "../services/user.service";

// 의존성 주입
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// 라우팅 설정
const router = Router();

/**
 * POST /users/signup
 * 회원 가입
 */
router.post(
    "/signup",
    validationMiddleware(SignupRequestDto),
    asyncHandler(userController.signup),
);

/**
 * POST /users/signin
 * 로그인
 */
router.post(
    "/signin",
    validationMiddleware(SigninRequestDto),
    asyncHandler(userController.signin),
);

export default router;
