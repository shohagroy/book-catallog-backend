import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { bookService } from "./book.service";
import { Book } from "@prisma/client";

const createNewBook = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.insertBookToDb(req.body);
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "book create successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const result = await bookService.getAllBooks();
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "books fetched successfully",
    data: result,
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
};
