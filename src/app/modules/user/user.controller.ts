import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { IUser } from "./user.interface";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUserToDb();
  sendResponse<Partial<IUser>[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "users retrieved successfully",
    data: result,
  });
});

export const userController = {
  getAllUser,
};
