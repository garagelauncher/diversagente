import { Coordinates } from 'src/shared/contracts/Coordinates';

export class CreateLocationDto {
  title: string;
  photos?: string[];
  description?: string;
  address?: string;
  coordinates: Coordinates;
  ownerId: string;
}
