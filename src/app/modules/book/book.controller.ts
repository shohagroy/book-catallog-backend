import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { bookService } from "./book.service";
import { Book } from "@prisma/client";
import pick from "../../../shared/pick";
import { paginationFields } from "../../../constants/pagination";
import { bookFilterableFields } from "./book.constants";

const createNewBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.insertBookToDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "book create successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, bookFilterableFields);

  const result = await bookService.getAllBooks(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "books fetched successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await bookService.getSingleBook(id);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "book fetched successfully",
    data: result,
  });
});

const getBooksByCategory = catchAsync(async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  const result = await bookService.getBooksByCategory(categoryId);
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books with associated category data fetched successfully",
    data: result,
  });
});

const updateBookInfo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;

  const result = await bookService.updateBookData(id, payload);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "book updated successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await bookService.deleteBook(id);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "book deleted successfully",
    data: result,
  });
});

export const bookController = {
  createNewBook,
  getAllBooks,
  getSingleBook,
  updateBookInfo,
  deleteBook,
  getBooksByCategory,
};
