import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.route("/").get(userController.getAllUser);

export const userRoutes = router;
