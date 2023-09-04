import express from "express";
import auth from "../../middlewares/auth";
import { ENUM_USER_ROLE } from "../user/user.constants";
import { reviewController } from "./review.controller";

const router = express.Router();

router
  .route("/create-review")
  .post(auth(ENUM_USER_ROLE.CUSTOMER), reviewController.createReview);
router
  .route("/")
  .get(auth(ENUM_USER_ROLE.ADMIN), reviewController.getAllReview)
  .patch(auth(ENUM_USER_ROLE.CUSTOMER), reviewController.updateReview)
  .delete(auth(ENUM_USER_ROLE.ADMIN), reviewController.deleteReview);

router
  .route("/:id")
  .get(auth(ENUM_USER_ROLE.ADMIN), reviewController.getSingleReviews)
  .patch(auth(ENUM_USER_ROLE.ADMIN), reviewController.updateReview)
  .delete(auth(ENUM_USER_ROLE.ADMIN), reviewController.deleteReview);

export const reivewsRoutes = router;
