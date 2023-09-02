import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { hashedPassword } from "../../utils/hashedPassword";
import { jwtHelpers } from "../../utils/jwtHelpers";
import { IUser } from "../user/user.interface";
import { userService } from "../user/user.service";

const createNewUser = async (payload: IUser) => {
  const isUserExists = await userService.findByEmail(payload.email);

  if (isUserExists) {
    throw new ApiError(httpStatus.FORBIDDEN, "user already exists");
  }

  payload.password = await hashedPassword.createhas(payload.password!);
  const newUser = await userService.insertUserToDB(payload);

  const token = await jwtHelpers.createToken(newUser);

  newUser.password = null;

  return { user: newUser, token };
};

export const authService = {
  createNewUser,
};
