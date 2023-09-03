import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Order } from "@prisma/client";
import { orderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await orderService.createNewOrder(data);
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
