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

const getSingleUserToDb = async (
  id: string
): Promise<Partial<IUser | null>> => {
  const result = await prisma.user.findFirst({
    where: {
      id,
    },
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

const updateUserDataToDb = async (
  id: string,
  payload: Partial<IUser>
): Promise<Partial<IUser | null>> => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: payload,
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

const deleteUserToDb = async (id: string): Promise<Partial<IUser | null>> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
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

  console.log(result);

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
  getSingleUserToDb,
  updateUserDataToDb,
  deleteUserToDb,
};
