export interface Subcategory {
  id: string;
  name: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  categoriesIds: string[];
  description: string;
  icon: string;
}

export interface SubcategoryForm {
  name: string;
  title: string;
  description: string;
  categoriesIds: [string];
}
