import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { authService } from "./auth.service";

const userSignup = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.createNewUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "user created successufully",
    data: result,
  });
});

export const authController = {
  userSignup,
};
