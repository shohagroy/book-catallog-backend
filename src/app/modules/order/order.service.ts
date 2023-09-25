import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Order, OrderedBook, Status, User } from "@prisma/client";
import { ENUM_USER_ROLE } from "../user/user.constants";

const createNewOrder = async (
  userId: string,
  orderedBooksData: OrderedBook[]
) => {
  const result = await prisma.$transaction(async (transactionClient) => {
    try {
      const order = await transactionClient.order.create({
        data: {
          userId,
        },
      });

      await Promise.all(
        orderedBooksData.map(async (bookData) => {
          const existingBook = await transactionClient.book.findUnique({
            where: { id: bookData.bookId },
          });

          if (!existingBook) {
            throw new ApiError(
              httpStatus.BAD_REQUEST,
              `Book with ID ${bookData.bookId} not found.`
            );
          }

          return transactionClient.orderedBook.create({
            data: {
              orderId: order.id,
              bookId: bookData.bookId,
              quantity: bookData.quantity,
            },
          });
        })
      );

      return await transactionClient.order.findUnique({
        where: { id: order.id },
        include: {
          orderedBooks: true,
        },
      });

      // console.log(newOrderData);
      // return newOrderData;
    } catch (error) {
      console.log(error);
    }
  });

  console.log("result", result);

  return result;
};

const getAllOrders = async (): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

const getUserOrders = async (userId: string): Promise<Order[]> => {
  const result = await prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      orderedBooks: true,
    },
  });

  return result;
};

const getSingleOrder = async (
  id: string,
  user: Partial<User>
): Promise<Order | null> => {
  let result: Order | null = null;

  if (user.role === ENUM_USER_ROLE.ADMIN) {
    result = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        orderedBooks: true,
      },
    });
  } else {
    result = await prisma.order.findUnique({
      where: {
        id,
        userId: user.id!,
      },
      include: {
        orderedBooks: true,
      },
    });
  }

  return result;
};

const updateOrderInfo = async (
  id: string,
  data: Partial<Order>
): Promise<Order | null> => {
  let result: Order | null = null;

  const order = await prisma.order.findUnique({
    where: {
      id,
    },
  });

  if (order?.status === Status.pending && data.status === Status.shipped) {
    result = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: Status.shipped,
      },
      include: {
        orderedBooks: true,
      },
    });
  } else if (
    order?.status === Status.shipped &&
    data.status === Status.delivered
  ) {
    result = await prisma.order.update({
      where: {
        id,
      },
      data: {
        status: Status.delivered,
      },
      include: {
        orderedBooks: true,
      },
    });
  } else {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invalid! order status must be pending => shipped => delivered"
    );
  }

  return result;
};

export const orderService = {
  createNewOrder,
  getAllOrders,
  getUserOrders,
  getSingleOrder,
  updateOrderInfo,
};
