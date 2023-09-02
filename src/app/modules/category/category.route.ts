import express from "express";
import { categoryController } from "./category.controller";

const router = express.Router();

router.route("/create-category").post(categoryController.createNewCategory);
router.route("/").get(categoryController.getAllCategories);

export const categoriesRoutes = router;
