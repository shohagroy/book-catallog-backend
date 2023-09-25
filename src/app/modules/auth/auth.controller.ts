import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";
import { User } from "@prisma/client";

const userSignup = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.createNewUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user created successufully",
    data: result,
  });
});

const userSignin = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.userSignin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user signin successufully",
    token: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const user: Partial<User> = req.user as Partial<User>;
  const result = await authService.getProfile(user.id!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user received successufully",
    data: result,
  });
});

export const authController = {
  userSignup,
  userSignin,
  getProfile,
};
