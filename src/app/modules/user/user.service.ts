import prisma from "../../../shared/prisma";
import { IUser } from "./user.interface";

const findByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};

const insertUserToDB = async (data: IUser): Promise<IUser> => {
  const result = await prisma.user.create({
    data,
  });

  return result;
};

export const userService = {
  findByEmail,
  insertUserToDB,
};
