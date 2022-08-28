import { Test, TestingModule } from '@nestjs/testing';
import { LocationsService } from 'src/modules/locations/locations.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import {
  findNearLocationListMock,
  locationMock,
  locationsRawMock,
} from 'test/__mocks__/location';
import { createPrismaProviderMock } from 'test/__mocks__/prisma';

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
    prisma.location.update = jest.fn().mockResolvedValue({
      ...locationMock,
      description: 'Nova descrição da localização mock',
    });
    prisma.location.findUnique = jest.fn().mockResolvedValue(undefined);

    prisma.location.findUnique = jest.fn().mockResolvedValue({
      ...locationMock,
      Review: [
        {
          stars: 5,
        },
      ],
      _count: {
        Review: 1,
      },
      geoposition: {
        type: 'Point',
        coordinates: [0, 0],
      },
    });
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

    prisma.location.findRaw = jest.fn().mockResolvedValue(locationsRawMock);

    const locations = await locationService.findNear(nearDTO);
    expect(locations).toEqual(findNearLocationListMock);
  });

  it('should be able update a location with success', async () => {
    const locationToUpdate = {
      description: 'Nova descrição da localização mock',
    };

    const locationUpdated = await locationService.update(
      locationMock.id,
      locationToUpdate,
    );

    expect(locationUpdated).toEqual({
      ...locationMock,
      description: 'Nova descrição da localização mock',
    });
  });

  it('should be able to get one location by id with success', async () => {
    const foundLocation = await locationService.findOne(
      'hjudasfhasdu-18473-mnksadfjs-1924903',
    );

    const expectedLocation = {
      ...locationMock,
      starsAverage: 5,
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      reviewCount: 1,
    };

    expect(foundLocation).toEqual(expect.objectContaining(expectedLocation));
  });

  it('should not be able to get one location that doesnt exist', async () => {

    await expect(locationService.findOne('1')).rejects.toThrowError(
      'Location with id 1 not found',
    );
  });
});
