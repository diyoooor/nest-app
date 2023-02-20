import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiTags } from "@nestjs/swagger";
import { Route, Services } from "src/utils/constants";
import { ICategoriesService } from "./categories";
import { CreateCategoriesDto } from "./dtos/CreateCategories.dto";

@ApiTags(Route.CATEGORIES)
@Controller(Route.CATEGORIES)
export class CategoriesController {
  constructor(@Inject(Services.CATEGORIES) private readonly categoriesService: ICategoriesService) {}

  @Post("")
  createCategories(@Body() body: CreateCategoriesDto) {
    return this.categoriesService.createCategories(body);
  }
}
