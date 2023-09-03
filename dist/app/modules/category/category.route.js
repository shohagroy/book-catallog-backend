"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("./category.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const router = express_1.default.Router();
router
    .route("/create-category")
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN), category_controller_1.categoryController.createNewCategory);
router.route("/").get(category_controller_1.categoryController.getAllCategories);
router
    .route("/:id")
    .get(category_controller_1.categoryController.getSingleCategory)
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN), category_controller_1.categoryController.updateCategoryData)
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN), category_controller_1.categoryController.deleteCategory);
exports.categoriesRoutes = router;
