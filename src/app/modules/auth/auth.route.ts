import express from "express";
import { authController } from "./auth.controller";
import { ENUM_USER_ROLE } from "../user/user.constants";
import auth from "../../middlewares/auth";

const router = express.Router();

router.route("/signup").post(authController.userSignup);
router.route("/signin").post(authController.userSignin);

router
  .route("/profile")
  .get(
    auth(
      ENUM_USER_ROLE.ADMIN,
      ENUM_USER_ROLE.CUSTOMER,
      ENUM_USER_ROLE.SUPER_ADMIN
    ),
    authController.getProfile
  );

export const authRoutes = router;
