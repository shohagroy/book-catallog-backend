import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "./user.constants";

const router = express.Router();

router.route("/").get(auth(ENUM_USER_ROLE.ADMIN), userController.getAllUser);
router
  .route("/:id")
  .get(auth(ENUM_USER_ROLE.ADMIN), userController.getSingle)
  .patch(auth(ENUM_USER_ROLE.ADMIN), userController.updateUserInfo)
  .delete(auth(ENUM_USER_ROLE.ADMIN), userController.deleteUser);

export const userRoutes = router;
