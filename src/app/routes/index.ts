import express from "express";
import { authRoute } from "../modules/auth/auth.route";

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/auth",
    route: authRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
