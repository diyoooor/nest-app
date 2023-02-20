import { CreateCategoryDetails } from "src/utils/type";

export interface ICategoriesService {
  createCategories(categoryDetails: CreateCategoryDetails): Promise<any>;
}
