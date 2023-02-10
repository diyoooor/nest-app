import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IUserService } from "./users";
import { CreateUserDetails, FindUserParams } from "src/utils/type";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/utils/typeorm";
import { Repository } from "typeorm";
import { hashPassword } from "src/utils/helpers";

@Injectable()
export class UsersService implements IUserService {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {}

  async createUser(userDetail: CreateUserDetails): Promise<User> {
    const existingUser = await this.userRepo.findOneBy({ email: userDetail.email });
    if (existingUser) throw new HttpException("User already exists", HttpStatus.CONFLICT);
    const password = await hashPassword(userDetail.password);
    const newUser = this.userRepo.create({ ...userDetail, password });
    return this.userRepo.save(newUser);
  }

  async findUser(findUserParams: Partial<{ id: number; email: string }>): Promise<User> {
    return await this.userRepo.findOneBy({ id: findUserParams.id, email: findUserParams.email });
  }
}
