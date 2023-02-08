import { CreateUserDto } from './dtos/CreateUser.dto';
import { Body, Controller, Get, Inject, Injectable, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Route, Services } from 'src/utils/type';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller(Route.AUTH)
export class AuthController {
  constructor(@Inject(Services.AUTH) private readonly authService: AuthService) {}

  @Post('register')
  async createUser(@Body() body: CreateUserDto){
    console.log(body)
  }

  @Post('login')
  login(){}

  @Post('logout')
  logout(){}

  @Get('status')
  status(){
    console.log('status')
    return 'status'
  }
  
}
