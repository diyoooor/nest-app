import { CreateUserDetails } from "src/utils/type";

export interface IUserService {
    createUser(userDetails: CreateUserDetails);
  }