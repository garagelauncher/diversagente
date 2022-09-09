interface ID {
  $oid: string;
}

interface CategoryName {
  type: string;
}

interface CategoryRawDate {
  $date: string;
}

export interface CategoryRaw {
  _id: ID;
  name: CategoryName;
  createdAt: CategoryRawDate;
  updatedAt: CategoryRawDate;
  ownerId: ID;
}
