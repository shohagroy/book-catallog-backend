import prisma from "../../../shared/prisma";
import { IUser } from "./user.interface";

const getAllUserToDb = async (): Promise<Partial<IUser>[]> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const findByEmail = async (email: string): Promise<IUser | null> => {
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
  getAllUserToDb,
};
