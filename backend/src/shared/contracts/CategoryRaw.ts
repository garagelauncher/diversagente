interface ID {
  $oid: string;
}

interface ownerId {
  $oid: string;
}

interface CategoryName {
  type: string;
}

interface CategoryRawDate {
  $date: string;
}
interface description {
  type?: string;
}

interface subcategories {}

export interface CategoryRaw {
  _id: ID;
  name: CategoryName;
  createdAt: CategoryRawDate;
  updatedAt: CategoryRawDate;
  ownerId: ownerId;
  description?: description;
}
