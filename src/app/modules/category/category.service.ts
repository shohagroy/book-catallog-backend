import { ICategory } from "./category.interface";
import prisma from "../../../shared/prisma";

const insertCategoryToDb = async (data: ICategory): Promise<ICategory> => {
  const result = await prisma.category.create({
    data,
  });

  return result;
};

const getCategories = async (): Promise<ICategory[]> => {
  const result = await prisma.category.findMany();

  return result;
};

export const categoryService = {
  insertCategoryToDb,
  getCategories,
};
