import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.route("/").get(userController.getAllUser);
router
  .route("/:id")
  .get(userController.getSingle)
  .patch(userController.updateUserInfo)
  .delete(userController.deleteUser);

export const userRoutes = router;
