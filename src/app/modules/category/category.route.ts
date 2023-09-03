import express from "express";
import { categoryController } from "./category.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.constants";

const router = express.Router();

router
  .route("/create-category")
  .post(auth(ENUM_USER_ROLE.ADMIN), categoryController.createNewCategory);
router.route("/").get(categoryController.getAllCategories);
router
  .route("/:id")
  .get(categoryController.getSingleCategory)
  .patch(auth(ENUM_USER_ROLE.ADMIN), categoryController.updateCategoryData)
  .delete(auth(ENUM_USER_ROLE.ADMIN), categoryController.deleteCategory);

export const categoriesRoutes = router;
