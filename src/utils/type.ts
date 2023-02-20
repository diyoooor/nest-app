import { Request } from "express";
import { User } from "./typeorm";

export type CreateUserDetails = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type ValidateUserDetail = {
  email: string;
  password: string;
};

export type FindUserParams = Partial<{
  id: number;
  email: string;
}>;

export type CreateCategoryDetails = {
  name: string;
  type: string;
};

export interface AuthenticatedRequest extends Request {
  user: User;
}
