import { CreateUserDto } from "./dtos/CreateUser.dto";
import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { Route, Services } from "src/utils/constants";
import { ApiTags } from "@nestjs/swagger";
import { IUserService } from "src/users/users";
import { IAuthService } from "./auth";

@ApiTags("auth")
@Controller(Route.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private readonly authService: IAuthService, @Inject(Services.USERS) private userService: IUserService) {}

  @Post("register")
  async createUser(@Body() body: CreateUserDto) {
    console.log(body);
    this.userService.createUser(body);
  }

  @Post("login")
  login() {}

  @Post("logout")
  logout() {}

  @Get("status")
  status() {
    console.log("status");
    return "status";
  }
}
