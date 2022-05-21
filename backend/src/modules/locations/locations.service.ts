import { Injectable, Logger } from '@nestjs/common';
import { Coordinates } from 'src/shared/contracts/Coordinates';
import { LocationRaw } from 'src/shared/contracts/LocationRaw';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { NearDTO } from './dto/find-near-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

function convertDistanceInKilometersToMeters(
  distanceInKilometers: number,
): number {
  return distanceInKilometers * 1000;
}

@Injectable()
export class LocationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLocationDto: CreateLocationDto) {
    const {
      coordinates: { latitude, longitude },
      title,
      ownerId,
      address,
      description,
      photos,
    } = createLocationDto;

    return await this.prisma.location.create({
      data: {
        title,
        ownerId,
        address,
        description,
        photos,
        geoposition: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
    });
  }

  async findNear({ longitude, latitude, distanceInKilometer, limit }: NearDTO) {
    Logger.debug('findNear params: ', {
      longitude,
      latitude,
      distanceInKilometer,
      limit,
    });

    const distanceInMeters =
      convertDistanceInKilometersToMeters(distanceInKilometer);

    const locations = (await this.prisma.location.findRaw({
      filter: {
        geoposition: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: distanceInMeters,
          },
        },
      },
      options: {
        limit,
      },
    })) as unknown as LocationRaw[];

    console.debug(locations);
    Logger.debug(locations);
    return locations.map((location) => ({
      id: location._id.$oid,
      title: location.title,
      ownerId: location.ownerId.$oid,
      createdAt: location.createdAt.$date,
      updatedAt: location.updatedAt.$date,
      coordinates: {
        latitude: location.geoposition.coordinates[1],
        longitude: location.geoposition.coordinates[0],
      },
    }));
  }

  async findAll() {
    const distanceInKilometer = 1000 * 50; // 50km

    const longitude = -46.615965;
    const latitude = -23.5377475;
    // create index 2dsphere into mongodb for field
    const radius = distanceInKilometer / 6378.1;

    const [quantity, abc, locations] = await Promise.all([
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
