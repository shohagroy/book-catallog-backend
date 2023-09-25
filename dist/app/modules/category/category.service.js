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
exports.categoryService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const insertCategoryToDb = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isAlreadyExist = yield prisma_1.default.category.findFirst({
        where: {
            title: data.title,
        },
    });
    if (isAlreadyExist) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "category already exists");
    }
    const result = yield prisma_1.default.category.create({
        data,
    });
    return result;
});
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findMany();
    return result;
});
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.findFirst({
        where: {
            id,
        },
    });
    return result;
});
const updateCategoryData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.update({
        where: {
            id,
        },
        data: payload,
        include: {
            books: true,
        },
    });
    return result;
});
const deleteCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.category.delete({
        where: {
            id,
        },
        include: {
            books: true,
        },
    });
    return result;
});
exports.categoryService = {
    insertCategoryToDb,
    getCategories,
    getSingleCategory,
    updateCategoryData,
    deleteCategory,
};
