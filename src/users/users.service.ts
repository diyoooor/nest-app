import { Injectable } from '@nestjs/common';
import { IUserService } from './users';
import { CreateUserDetails } from 'src/utils/type';

@Injectable()
export class UsersService implements IUserService {
    createUser(userDetails: CreateUserDetails) {
        console.log(`UserService.createUser`)
    }
}
