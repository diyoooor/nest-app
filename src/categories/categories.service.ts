import { Injectable } from "@nestjs/common";
import { ICategoriesService } from "./categories";
import { CreateCategoryDetails } from "src/utils/type";
import { InjectRepository } from "@nestjs/typeorm";
import { Categories } from "src/utils/typeorm/entities/Categories";
import { Repository } from "typeorm";

@Injectable()
export class CategoriesService implements ICategoriesService {
  constructor(@InjectRepository(Categories) private readonly categoriesRepo: Repository<Categories>) {}
  createCategories(categoryDetails: CreateCategoryDetails) {
    return this.categoriesRepo.save(categoryDetails);
  }
}
