"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const user_constants_1 = require("../user/user.constants");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.route("/signup").post(auth_controller_1.authController.userSignup);
router.route("/signin").post(auth_controller_1.authController.userSignin);
router
    .route("/profile")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN, user_constants_1.ENUM_USER_ROLE.CUSTOMER, user_constants_1.ENUM_USER_ROLE.SUPER_ADMIN), auth_controller_1.authController.getProfile);
exports.authRoutes = router;
