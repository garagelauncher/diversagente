export interface Subcategory {
  id: string;
  name: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  categoriesIds: string[];
  category: string;
  //TODO: category => retornar apenas string!
  //validar se existirá icon/cor para cada subcategoria
}
