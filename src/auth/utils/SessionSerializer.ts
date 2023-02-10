import { User } from "./../../utils/typeorm/entities/User";
import { IUserService } from "src/users/users";
import { Inject, Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { Services } from "src/utils/constants";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.USERS)
    private readonly userService: IUserService,
  ) {
    super();
  }
  serializeUser(user: User, done: Function) {
    console.log(user);
    console.log("SerializeUser");
    done(null, user);
  }
  async deserializeUser(payload: User, done: Function) {
    console.log("DeserializeUser");
    console.log(payload);
    const userDb = await this.userService.findUser({ id: payload.id });
    console.log(userDb);
    return userDb ? done(null, userDb) : done(null, null);
  }
}
