import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLocationDto: CreateLocationDto) {
    return await this.prisma.location.create({
      data: createLocationDto,
    });
  }

  async findAll() {
    const distanceInKilometer = 1000 * 500; // 50km

    const longitude = -46.615965;
    const latitude = -23.5377475;
    // create index 2dsphere into mongodb for field
    const radius = distanceInKilometer / 6378.1;

    const [quantity, locations] = await Promise.all([
      this.prisma.location.count(),
      this.prisma.location.findRaw({
        filter: {
          coordinates: {
            $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
          },
        },
      }),
      this.prisma.location.findRaw({
        filter: {
          coordinates: {
            $nearSphere: {
              $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude],
              },

              $maxDistance: distanceInKilometer,
            },
          },
        },
      }),
    ]);

    Logger.debug(locations);
    Logger.debug(quantity);
    return locations;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
