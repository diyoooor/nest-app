import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";

import entities from "./utils/typeorm";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({
      envFilePath: ".env.development",
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_DB_HOST,
      port: parseInt(process.env.POSTGRES_DB_PORT),
      username: process.env.POSTGRES_DB_USERNAME,
      password: process.env.POSTGRES_DB_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
      synchronize: true,
      entities,
    }),
  ],
})
export class AppModule {}
