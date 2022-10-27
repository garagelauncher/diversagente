interface ID {
  $oid: string;
}

interface LocationRawDate {
  $date: string;
}

interface Geoposition {
  type: string;
  coordinates: number[];
}

export interface LocationRaw {
  _id: ID;
  geoposition: Geoposition;
  title: string;
  createdAt: LocationRawDate;
  updatedAt: LocationRawDate;
  ownerId: ID;
  icon: string;
  iconProvider: string;
  categoryId: ID;
}
