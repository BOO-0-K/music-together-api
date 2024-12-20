import {
    Request as ExpressRequest,
    Response as ExpressResponse,
} from "express";
import UserService from "../services/user.service";
import Response from "../_commons/utils/response";
import { CustomHttpSuccess } from "../_commons/constants/success.constants";

class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    // 회원가입
    signup = async (req: ExpressRequest, res: ExpressResponse) => {
        const { username, email, password } = req.body;
        const token = await this.userService.signup(username, email, password);
        Response.send(res, 201, CustomHttpSuccess["SIGNUP_SUCCESS"], token);
    };

    // 로그인
    signin = async (req: ExpressRequest, res: ExpressResponse) => {
        const { email, password } = req.body;
        const token = await this.userService.signin(email, password);
        Response.send(res, 200, CustomHttpSuccess["SIGNIN_SUCCESS"], token);
    };
}

export default UserController;
