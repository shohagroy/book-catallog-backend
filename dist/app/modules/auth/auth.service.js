"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const hashedPassword_1 = require("../../utils/hashedPassword");
const jwtHelpers_1 = require("../../utils/jwtHelpers");
const user_service_1 = require("../user/user.service");
const createNewUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_service_1.userService.findByEmail(payload.email);
    if (isUserExists) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "user already exists");
    }
    payload.password = yield hashedPassword_1.hashedPassword.createhas(payload.password);
    const newUser = yield user_service_1.userService.insertUserToDB(payload);
    const token = yield jwtHelpers_1.jwtHelpers.createToken(newUser);
    newUser.password = "";
    return { user: newUser, token };
});
const userSignin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isUserExists = yield user_service_1.userService.findByEmail(email);
    if (!isUserExists) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "user does not exists");
    }
    const isPasswordMatched = yield hashedPassword_1.hashedPassword.comparePassword(password, isUserExists.password);
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "password does not match");
    }
    const token = yield jwtHelpers_1.jwtHelpers.createToken(isUserExists);
    isUserExists.password = "";
    return { user: isUserExists, token };
});
const getProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getSingleUserToDb(id);
    return result;
});
exports.authService = {
    createNewUser,
    userSignin,
    getProfile,
};
