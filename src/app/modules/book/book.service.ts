import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Book } from "@prisma/client";

const insertBookToDb = async (data: Book): Promise<Book> => {
  const isAlreadyExist = await prisma.book.findFirst({
    where: {
      title: data.title,
    },
  });

  if (isAlreadyExist) {
    throw new ApiError(httpStatus.FORBIDDEN, "book already exists");
  }

  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });

  return result;
};

const getAllBooks = async (): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
  });

  return result;
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return result;
};

const updateBookData = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });

  return result;
};

const deleteBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });

  return result;
};

export const bookService = {
  insertBookToDb,
  getAllBooks,
  getSingleBook,
  updateBookData,
  deleteBook,
};
