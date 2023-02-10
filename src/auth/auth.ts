import { User } from "src/utils/typeorm";
import { ValidateUserDetail } from "./../utils/type";
export interface IAuthService {
  validateUser(userCredentials: ValidateUserDetail): Promise<User | null>;
}
