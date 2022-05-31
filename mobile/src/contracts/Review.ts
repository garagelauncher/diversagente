import { User } from '@src/contexts/AuthContext';

export interface Review {
  owner: User;
  id: string;
  text: string;
  stars: number;
  locationId: string;
  createdAt: string;
  updatedAt: string;
  ownerId: string;
}
