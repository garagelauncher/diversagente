export type IncludeInto<ShapeObject, AddictionObject> = ShapeObject &
  Omit<AddictionObject, keyof ShapeObject>;
