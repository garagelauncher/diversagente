interface ID {
  $oid: string;
}

interface ownerId {
  $oid: string;
}

interface locationId {
  $oid: string;
}

interface ReviewRawDate {
  $date: string;
}

interface stars {
  type: number;
}

interface text {
  type: string;
}

export interface ReviewRaw {
  _id: ID;
  ownerId: ownerId;
  locationId : locationId;
  createdAt: ReviewRawDate;
  deletedAt: ReviewRawDate;
  stars: stars;
  text: text;
}
