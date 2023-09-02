import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { IUser } from "../modules/user/user.interface";
import config from "../../config";

const createToken = (user: Partial<IUser>): string => {
  const { id, name, email, role } = user;

  const payload = { id, name, email, role };

  return jwt.sign(payload, config.secrect_token_key, {
    expiresIn: config.expires_in,
  });
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
