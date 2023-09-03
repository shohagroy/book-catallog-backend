import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { categoriesRoutes } from "../modules/category/category.route";
import { booksRoutes } from "../modules/book/book.route";
import { ordersRoutes } from "../modules/order/order.route";
import { reivewsRoutes } from "../modules/review/review.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    route: authRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/categories",
    route: categoriesRoutes,
  },
  {
    path: "/books",
    route: booksRoutes,
  },
  {
    path: "/orders",
    route: ordersRoutes,
  },
  {
    path: "/reviews",
    route: reivewsRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
