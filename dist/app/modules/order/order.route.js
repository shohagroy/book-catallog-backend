"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constants_1 = require("../user/user.constants");
const router = express_1.default.Router();
router
    .route("/create-order")
    .post((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.CUSTOMER), order_controller_1.orderController.createOrder);
router
    .route("/")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.CUSTOMER, user_constants_1.ENUM_USER_ROLE.ADMIN), order_controller_1.orderController.getAllOrders);
router
    .route("/:orderId")
    .get((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.CUSTOMER, user_constants_1.ENUM_USER_ROLE.ADMIN), order_controller_1.orderController.getSingleOrder)
    .patch((0, auth_1.default)(user_constants_1.ENUM_USER_ROLE.ADMIN), order_controller_1.orderController.updateOrderInfo);
exports.ordersRoutes = router;
