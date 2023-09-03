import express from "express";
import { bookController } from "./book.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.constants";

const router = express.Router();

router
  .route("/create-book")
  .post(auth(ENUM_USER_ROLE.ADMIN), bookController.createNewBook);
router.route("/").get(bookController.getAllBooks);
router
  .route("/:id")
  .get(bookController.getSingleBook)
  .patch(auth(ENUM_USER_ROLE.ADMIN), bookController.updateBookInfo)
  .delete(auth(ENUM_USER_ROLE.ADMIN), bookController.deleteBook);

router.route("/:categoryId/category").get(bookController.getBooksByCategory);

export const booksRoutes = router;
