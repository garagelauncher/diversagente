import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from 'src/modules/locations/locations.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  findNearLocationListMock,
  locationMock,
} from 'test/__mocks__/location';
import { createPrismaProviderMock } from 'test/__mocks__/prisma';
import { LocationRaw } from 'src/shared/contracts/LocationRaw';

describe('LocationsService', () => {
  let locationService: LocationsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationsService, createPrismaProviderMock()],
    }).compile();

    locationService = module.get<LocationsService>(LocationsService);
    prisma = module.get<PrismaService>(PrismaService);

    prisma.location.create = jest.fn().mockResolvedValue(locationMock);
    prisma.location.delete = jest.fn().mockResolvedValue(locationMock);
  });

  it('should be defined', () => {
    expect(locationService).toBeDefined();
  });

  it('should be able to create a location with success', async () => {
    const location = {
      title: 'Localização mock',
      description: 'Descrição da localização mock',
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      ownerId: '1',
    };

    const createdLocation = await locationService.create(location);
    expect(createdLocation).toEqual(locationMock);
  });

  it('should be able to delete a location with success', async () => {
    const deletedLocation = await locationService.remove(
      'hjudasfhasdu-18473-mnksadfjs-1924903',
    );
    expect(deletedLocation).toEqual(locationMock);
  });

  it('should be able to find near location around some coordinates', async () => {
    const nearDTO = {
      longitude: 0,
      latitude: 0,
      distanceInKilometer: 1,
      limit: 10,
    };

    const locationsRawMock: LocationRaw[] = [
      {
        _id: {
          $oid: 'hjudasfhasdu-18473-mnksadfjs-1924903',
        },
        createdAt: {
          $date: '2021-01-01T00:00:00.000Z',
        },
        updatedAt: {
          $date: '2021-01-01T00:00:00.000Z',
        },
        ownerId: {
          $oid: '01923408oaskfjoasdj=jiasfjsdi-oiashjdfk',
        },
        geoposition: {
          type: 'Point',
          coordinates: [0, 0],
        },
        title: 'Localização mock',
      },
    ];

    prisma.location.findRaw = jest.fn().mockResolvedValue(locationsRawMock);

    const locations = await locationService.findNear(nearDTO);
    expect(locations).toEqual(findNearLocationListMock);
  });
});
