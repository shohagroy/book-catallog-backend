import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Order, User } from "@prisma/client";
import { orderService } from "./order.service";

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

export const orderController = {
  createOrder,
};
