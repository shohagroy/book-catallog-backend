import express from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.constants";

const router = express.Router();

router
  .route("/create-order")
  .post(auth(ENUM_USER_ROLE.CUSTOMER), orderController.createOrder);

export const ordersRoutes = router;
