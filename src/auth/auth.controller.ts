import { CreateUserDto } from "./dtos/CreateUser.dto";
import { Body, Controller, Get, HttpStatus, Inject, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Route, Services } from "src/utils/constants";
import { ApiTags } from "@nestjs/swagger";
import { IUserService } from "src/users/users";
import { IAuthService } from "./auth";
import { instanceToPlain } from "class-transformer";
import { LocalAuthGuard } from "./utils/Guards";

@ApiTags("auth")
@Controller(Route.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private readonly authService: IAuthService, @Inject(Services.USERS) private userService: IUserService) {}

  @Post("register")
  async createUser(@Body() body: CreateUserDto) {
    return instanceToPlain(await this.userService.createUser(body));
  }

  @Post("login")
  login(@Res() res: Response) {
    return res.send(HttpStatus.OK);
  }

  @Post("logout")
  logout() {}

  @UseGuards(LocalAuthGuard)
  @Get("status")
  status() {
    console.log("status");
    return "status";
  }
}
