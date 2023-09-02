import { ICategory } from "./category.interface";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const insertCategoryToDb = async (data: ICategory): Promise<ICategory> => {
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

const getCategories = async (): Promise<ICategory[]> => {
  const result = await prisma.category.findMany();

  return result;
};

const getSingleCategory = async (id: string): Promise<ICategory | null> => {
  const result = await prisma.category.findFirst({
    where: {
      id,
    },
  });

  return result;
};

const updateCategoryData = async (
  id: string,
  payload: Partial<ICategory>
): Promise<ICategory | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteCategory = async (id: string): Promise<ICategory | null> => {
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
