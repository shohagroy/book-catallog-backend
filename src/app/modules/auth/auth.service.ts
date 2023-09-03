import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { hashedPassword } from "../../utils/hashedPassword";
import { jwtHelpers } from "../../utils/jwtHelpers";
import { userService } from "../user/user.service";
import { User } from "@prisma/client";

const createNewUser = async (payload: User) => {
  const isUserExists = await userService.findByEmail(payload.email);

  if (isUserExists) {
    throw new ApiError(httpStatus.FORBIDDEN, "user already exists");
  }

  payload.password = await hashedPassword.createhas(payload.password!);
  const newUser = await userService.insertUserToDB(payload);

  const token = await jwtHelpers.createToken(newUser);

  newUser.password = "";

  return { user: newUser, token };
};

const userSignin = async (payload: Partial<User>) => {
  const { email, password } = payload;
  const isUserExists = await userService.findByEmail(email!);

  if (!isUserExists) {
    throw new ApiError(httpStatus.FORBIDDEN, "user does not exists");
  }

  const isPasswordMatched = await hashedPassword.comparePassword(
    password!,
    isUserExists.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.FORBIDDEN, "password does not match");
  }

  const token = await jwtHelpers.createToken(isUserExists);

  isUserExists.password = "";

  return { user: isUserExists, token };
};

const getProfile = async (id: string) => {
  const result = await userService.getSingleUserToDb(id);

  return result;
};

export const authService = {
  createNewUser,
  userSignin,
  getProfile,
};
