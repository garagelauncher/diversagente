import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { Coordinates } from 'src/shared/contracts/Coordinates';
import { PrismaService } from 'src/shared/database/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectModel('locations') private locationModel: Model<Location & Document>,
  ) {}

  async create(createLocationDto: CreateLocationDto) {
    return await this.locationModel.create({
      ...createLocationDto,
      location: {
        coordinates: [
          createLocationDto.coordinates.longitude,
          createLocationDto.coordinates.latitude,
        ],
      },
    });
    // return await this.prisma.location.create({
    //   data: createLocationDto,
    // });
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

  async findByLocation({ longitude, latitude }: Coordinates) {
    const distanceInKilometer = 1000 * 5; // 50km

    // create index 2dsphere into mongodb for field
    const radius = distanceInKilometer / 6378.1;

    const result = await this.locationModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        },
      },
    });

    Logger.debug(result);
    return result;
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
