import { CategoryType } from './category-type';

export interface DataSetCategories {
  id: number;
  category: string;
  categoryType: CategoryType[];
}
