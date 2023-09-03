export const bookFilterableFields: string[] = [
  "search",
  "category",
  "maxPrice",
  "minPrice",
];

export const bookSearchableFields: string[] = ["title", "author", "genre"];

export const bookRelationalFieldsMapper: { [key: string]: string } = {
  category: "academicFaculty",
  minPrice: "academicDepartment",
  maxPrice: "academicSemester",
};
