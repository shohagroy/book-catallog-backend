import express from "express";
import { authController } from "./auth.controller";

const router = express.Router();

router.route("/signup").post(authController.userSignup);
router.route("/signin").post(authController.userSignin);

export const authRoutes = router;
