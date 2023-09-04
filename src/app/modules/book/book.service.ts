import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Book, Prisma } from "@prisma/client";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { IBookFilters } from "./book.interface";
import { bookSearchableFields } from "./book.constants";

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

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
) => {
  const { size, page, skip } =
    paginationHelpers.calculatePagination(paginationOptions);

  const { search, ...filterData } = filters;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map((field) => ({
        [field]: {
          contains: search,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => {
        if (key === "category") {
          return {
            category: {
              id: {
                in: [filterData[key]],
              },
            },
          };
        } else if (key === "minPrice") {
          return {
            price: {
              gte: parseFloat(filterData[key]!),
            },
          };
        } else if (key === "maxPrice") {
          return {
            price: {
              lte: parseFloat(filterData[key]!),
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput | {} =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
      reviews: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy:
      paginationOptions.sortBy && paginationOptions.sortOrder
        ? { [paginationOptions.sortBy]: paginationOptions.sortOrder }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      size,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      reviews: true,
    },
  });

  return result;
};

const getBooksByCategory = async (categoryId: string): Promise<Book[]> => {
  const result = await prisma.book.findMany({
    where: {
      categoryId,
    },
    include: {
      category: true,
      reviews: true,
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
      reviews: true,
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
      reviews: true,
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
  getBooksByCategory,
};
