import { Role } from "@prisma/client";

export type IUser = {
  id?: string;
  name: string;
  email: string;
  password: string | null;
  role: Role;
  contactNo: string;
  address: string;
  profileImg: string;
  createdAt?: Date;
  updatedAt?: Date;
};
