import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Category } from "@prisma/client";

const insertCategoryToDb = async (data: Category): Promise<Category> => {
  const isAlreadyExist = await prisma.category.findFirst({
    where: {
      title: data.title,
    },
  });

  if (isAlreadyExist) {
    throw new ApiError(httpStatus.FORBIDDEN, "category already exists");
  }

  const result = await prisma.category.create({
    data,
  });

  return result;
};

const getCategories = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();

  return result;
};

const getSingleCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  return result;
};

const updateCategoryData = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteCategory = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });

  return result;
};

export const categoryService = {
  insertCategoryToDb,
  getCategories,
  getSingleCategory,
  updateCategoryData,
  deleteCategory,
};
