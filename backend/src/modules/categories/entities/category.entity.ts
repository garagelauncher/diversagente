import { Subcategory } from '@prisma/client';
import { Location } from '@prisma/client';
import { User } from '@prisma/client';

export class Category {
  id: string;
  name: string;
  title: string;

  createdAt: Date;
  updatedAt: Date;

  Subcategory: Subcategory;
  Location: Location;
  User: User;
}
