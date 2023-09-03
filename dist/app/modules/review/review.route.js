"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reivewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const review_controller_1 = require("./review.controller");
const router = express_1.default.Router();
router
    .route("/create-review")
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.CUSTOMER), review_controller_1.reviewController.createReview);
router
    .route("/")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN), review_controller_1.reviewController.getAllReview)
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.CUSTOMER), review_controller_1.reviewController.updateReview)
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN), review_controller_1.reviewController.deleteReview);
router
    .route("/:id")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN), review_controller_1.reviewController.getSingleReviews)
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.CUSTOMER), review_controller_1.reviewController.updateReview)
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN), review_controller_1.reviewController.deleteReview);
exports.reivewsRoutes = router;
