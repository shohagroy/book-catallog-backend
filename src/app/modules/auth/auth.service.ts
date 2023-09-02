import { hashedPassword } from "../../utils/hashedPassword";
import { jwtHelpers } from "../../utils/jwtHelpers";
import { IUser } from "../user/user.interface";
import { userService } from "../user/user.service";

const createNewUser = async (payload: IUser) => {
  console.log(payload);
  const isUserExists = await userService.findByEmail(payload.email);

  if (isUserExists) {
    console.log("user already exists");
  }

  payload.password = await hashedPassword.createhas(payload.password!);
  const newUser = await userService.insertUserToDB(payload);

  const token = await jwtHelpers.createToken(newUser);

  console.log(token, newUser);

  newUser.password = null;

  return { user: newUser, token };

  // return isUserExists;
};

export const authService = {
  createNewUser,
};
