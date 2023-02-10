import { ValidateUserDetail } from "./../utils/type";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { IAuthService } from "./auth";
import { Services } from "src/utils/constants";
import { IUserService } from "src/users/users";
import { compareHash } from "src/utils/helpers";
import { User } from "src/utils/typeorm";

@Injectable()
export class AuthService implements IAuthService {
  constructor(@Inject(Services.USERS) private readonly userService: IUserService) {}

  async validateUser(userDetails: ValidateUserDetail): Promise<User | null> {
    const user = await this.userService.findUser({ email: userDetails.email });
    if (!user) throw new HttpException("Invalid Credentials", HttpStatus.UNAUTHORIZED);
    const isPasswordValid = compareHash(userDetails.password, user.password);
    return isPasswordValid ? user : null;
  }
}
