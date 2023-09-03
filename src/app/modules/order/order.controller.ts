import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Order, User } from "@prisma/client";
import { orderService } from "./order.service";
import { ENUM_USER_ROLE } from "../user/user.constants";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const user: Partial<User> = req.user as Partial<User>;
  const result = await orderService.createNewOrder(
    user.id!,
    req.body.orderedBooks
  );
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "order created successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const user: Partial<User> = req.user as Partial<User>;

  let result = [];

  if (user.role === ENUM_USER_ROLE.ADMIN) {
    result = await orderService.getAllOrders();
  } else {
    result = await orderService.getUserOrders(user.id!);
  }

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "orders retrieved successfully",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const user: Partial<User> = req.user as Partial<User>;
  const { orderId } = req.params;

  const result = await orderService.getSingleOrder(orderId, user);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "order fetched successfully",
    data: result,
  });
});

export const orderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
