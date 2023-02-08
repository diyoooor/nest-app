import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { Services } from 'src/utils/constants';

@Module({
  controllers: [],
  providers: [
    {
      provide: Services.USERS,
      useClass: UsersService
    }
  ],
  exports: [
    {
      provide: Services.USERS,
      useClass: UsersService
    }
  ]
  
})
export class UsersModule {}
