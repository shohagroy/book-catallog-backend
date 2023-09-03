import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Order } from "@prisma/client";

const createNewOrder = async (data: Order): Promise<Order> => {
  console.log(data);
  // const result = await prisma.order.create({
  //   data,
  // });

  // return result;
};

export const orderService = {
  createNewOrder,
};
