"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const router = express_1.default.Router();
router
    .route("/create-book")
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN), book_controller_1.bookController.createNewBook);
router.route("/").get(book_controller_1.bookController.getAllBooks);
router
    .route("/:id")
    .get(book_controller_1.bookController.getSingleBook)
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN), book_controller_1.bookController.updateBookInfo)
    .delete((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN), book_controller_1.bookController.deleteBook);
router.route("/:categoryId/category").get(book_controller_1.bookController.getBooksByCategory);
exports.booksRoutes = router;
