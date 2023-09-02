import express from "express";
import { bookController } from "./book.controller";

const router = express.Router();

router.route("/create-book").post(bookController.createNewBook);
router.route("/").get(bookController.getAllBooks);
router
  .route("/:id")
  .get(bookController.getSingleBook)
  .patch(bookController.updateBookInfo)
  .delete(bookController.deleteBook);

export const booksRoutes = router;
