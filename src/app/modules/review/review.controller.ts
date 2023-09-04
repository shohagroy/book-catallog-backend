import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { Review, User } from "@prisma/client";
import { reviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.createReview(req.body);
  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "review created successfully",
    data: result,
  });
});

const getAllReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.getAllReview();
  sendResponse<Review[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "reviews received successfully",
    data: result,
  });
});

const getSingleReviews = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.getSingleReview(id);
  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "review received successfully",
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await reviewService.deleteReview(id);
  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "review delete successfully",
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await reviewService.updateReview(id, req.body);

  sendResponse<Review>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "review updated successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
  getAllReview,
  getSingleReviews,
  deleteReview,
  updateReview,
};
