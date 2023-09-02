import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { categoryService } from "./category.service";
import { ICategory } from "./category.interface";

const createNewCategory = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await categoryService.insertCategoryToDb(data);
  sendResponse<ICategory>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category create successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getCategories();
  sendResponse<ICategory[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "categories retrieved successfully",
    data: result,
  });
});

export const categoryController = {
  createNewCategory,
  getAllCategories,
};
