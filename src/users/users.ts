import { CreateUserDetails, FindUserParams } from "src/utils/type";
import { User } from "src/utils/typeorm";

export interface IUserService {
  createUser(userDetails: CreateUserDetails): Promise<User>;
  findUser(findUserParams: FindUserParams): Promise<User>;
}
