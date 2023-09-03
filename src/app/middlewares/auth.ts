import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import config from "../../config";
import { jwtHelpers } from "../utils/jwtHelpers";

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      let verifiedUser = null;

      verifiedUser = jwtHelpers.verifyToken(
        token,
        config.secrect_token_key as Secret
      );

      console.log(verifiedUser);
      req.user = verifiedUser;

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
