import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Review, User } from "@prisma/client";

const createReview = async (data: Review): Promise<Review> => {
  const { rating } = data;

  if (rating < 1 || rating > 5) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "rating must be between 1 and 5"
    );
  }

  const result = await prisma.review.create({
    data,
    include: {
      book: true,
    },
  });

  return result;
};

const getAllReview = async (): Promise<Review[]> => {
  const result = await prisma.review.findMany({
    include: {
      user: true,
      book: true,
    },
  });

  return result;
};

const getSingleReview = async (id: string) => {
  const result = await prisma.review.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      book: true,
    },
  });

  return result;
};

const deleteReview = async (id: string): Promise<Review> => {
  const result = await prisma.review.delete({
    where: {
      id,
    },
    include: {
      user: true,
      book: true,
    },
  });

  return result;
};

const updateReview = async (
  id: string,
  data: Partial<Review>
): Promise<Review> => {
  const result = await prisma.review.update({
    where: {
      id,
    },
    data,
    include: {
      user: true,
      book: true,
    },
  });
  return result;
};

export const reviewService = {
  createReview,
  deleteReview,
  getAllReview,
  updateReview,
  getSingleReview,
};
