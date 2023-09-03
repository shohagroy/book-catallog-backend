import { ICategory } from "../category/category.interface";

export type IBook = {
  id?: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  publicationDate: Date;
  categoryId: string;
  categories?: ICategory;
  createdAt?: Date;
  updatedAt?: Date;
};

export type IBookFilters = {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
};
