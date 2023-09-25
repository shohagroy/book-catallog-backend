"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { rating } = data;
    if (rating < 1 || rating > 5) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "rating must be between 1 and 5");
    }
    const result = yield prisma_1.default.review.create({
        data,
        include: {
            book: true,
        },
    });
    return result;
});
const getAllReview = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findMany({
        include: {
            user: true,
            book: true,
        },
    });
    return result;
});
const getSingleReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.findUnique({
        where: {
            id,
        },
        include: {
            user: true,
            book: true,
        },
    });
    return result;
});
const deleteReview = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.delete({
        where: {
            id,
        },
        include: {
            user: true,
            book: true,
        },
    });
    return result;
});
const updateReview = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.review.update({
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
});
exports.reviewService = {
    createReview,
    deleteReview,
    getAllReview,
    updateReview,
    getSingleReview,
};
