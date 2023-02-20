import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CategoriesController } from "./categories.controller";
import { Categories } from "src/utils/typeorm/entities/Categories";
import { Services } from "src/utils/constants";

@Module({
  imports: [TypeOrmModule.forFeature([Categories])],
  controllers: [CategoriesController],
  providers: [
    {
      provide: Services.CATEGORIES,
      useClass: CategoriesService,
    },
  ],
})
export class CategoriesModule {}
