import express from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { userRoutes } from "../modules/user/user.route";
import { categoriesRoutes } from "../modules/category/category.route";
import { booksRoutes } from "../modules/book/book.route";

const router = express.Router();

const moduleRoutes = [
  // ... routes
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
