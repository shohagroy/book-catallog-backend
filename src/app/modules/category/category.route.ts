import express from "express";
import { categoryController } from "./category.controller";

const router = express.Router();

router.route("/create-category").post(categoryController.createNewCategory);
router.route("/").get(categoryController.getAllCategories);
router
  .route("/:id")
  .get(categoryController.getSingleCategory)
  .patch(categoryController.updateCategoryData)
  .delete(categoryController.deleteCategory);

export const categoriesRoutes = router;
