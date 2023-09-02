import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { categoryService } from "./category.service";
import { Category } from "@prisma/client";

const createNewCategory = catchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await categoryService.insertCategoryToDb(data);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category create successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getCategories();
  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "categories fetched successfully",
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await categoryService.getSingleCategory(id);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category fetched successfully",
    data: result,
  });
});

const updateCategoryData = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await categoryService.updateCategoryData(id, payload);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await categoryService.deleteCategory(id);
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "category deleted successfully",
    data: result,
  });
});

export const categoryController = {
  createNewCategory,
  getAllCategories,
  getSingleCategory,
  updateCategoryData,
  deleteCategory,
};
