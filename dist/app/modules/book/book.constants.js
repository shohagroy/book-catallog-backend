"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldsMapper = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = [
    "search",
    "category",
    "maxPrice",
    "minPrice",
];
exports.bookSearchableFields = ["title", "author", "genre"];
exports.bookRelationalFieldsMapper = {
    category: "academicFaculty",
    minPrice: "academicDepartment",
    maxPrice: "academicSemester",
};
