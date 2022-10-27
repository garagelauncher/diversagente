interface ID {
  $oid: string;
}

interface ownerId {
  $oid: string;
}

interface CategoryId {
  $oid: string;
}

interface SubcategoryName {
  type: string;
}

interface SubcategoryRawDate {
  $date: string;
}
interface description {
  type?: string;
}

export interface SubcategoryRaw {
  _id: ID;
  name: SubcategoryName;
  text?: description;
  createdAt: SubcategoryRawDate;
  updatedAt: SubcategoryRawDate;
  ownerId: ownerId;
  categoryId: CategoryId;
}
