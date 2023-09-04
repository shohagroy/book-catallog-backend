import express from "express";
import { orderController } from "./order.controller";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.constants";

const router = express.Router();

router
  .route("/create-order")
  .post(auth(ENUM_USER_ROLE.CUSTOMER), orderController.createOrder);

router
  .route("/")
  .get(
    auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
    orderController.getAllOrders
  );

router
  .route("/:orderId")
  .get(
    auth(ENUM_USER_ROLE.CUSTOMER, ENUM_USER_ROLE.ADMIN),
    orderController.getSingleOrder
  )
  .patch(auth(ENUM_USER_ROLE.ADMIN), orderController.updateOrderInfo);

export const ordersRoutes = router;
