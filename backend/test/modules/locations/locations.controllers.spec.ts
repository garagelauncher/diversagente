import { Test, TestingModule } from '@nestjs/testing';
import { locationMock } from 'test/__mocks__/location';
import { LocationsController } from '../../../src/modules/locations/locations.controller';
import { LocationsService } from '../../../src/modules/locations/locations.service';

describe('LocationsController', () => {
  let locationsController: LocationsController;
  let locationsService: LocationsService;

  beforeEach(async () => {
    const mockLocationService = {
      provide: LocationsService,
      useValue: {
        findAll: jest.fn().mockResolvedValue([locationMock]),
        create: jest.fn().mockResolvedValue(locationMock),
        findOne: jest.fn().mockResolvedValue(locationMock),
        update: jest.fn().mockResolvedValue(locationMock),
        remove: jest.fn().mockResolvedValue(locationMock),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationsController],
      providers: [LocationsService, mockLocationService],
    }).compile();

    locationsController = module.get<LocationsController>(LocationsController);
    locationsService = module.get<LocationsService>(LocationsService);
  });

  it('should be defined', () => {
    expect(locationsController).toBeDefined();
    expect(locationsService).toBeDefined();
  });

  describe('success case', () => {
    const location = {
      id: 'hjudasfhasdu-18473-mnksadfjs-1924903',
      title: 'Localização mock',
      description: 'Descrição da localização mock',
      coordinates: {
        latitude: 0,
        longitude: 0,
      },
      ownerId: '01923408oaskfjoasdj=jiasfjsdi-oiashjdfk',
      categoryId: '01923408oaskfjoasdj=jiasfjsdi-oiashjdfk',
      icon: 'icon',
      iconProvider: 'Feather',
    };

    it('should be able to update a location', async () => {
      const updatedLocation = await locationsController.update(
        'hjudasfhasdu-18473-mnksadfjs-1924903',
        {
          title: 'Localização mock alterado',
        },
      );
      expect(updatedLocation).toEqual(locationMock);
    });

    it('should be able to create a location', async () => {
      const createdLocation = await locationsController.create(location);
      expect(createdLocation).toEqual(locationMock);
    });

    it('should be able to find one location', async () => {
      const foundLocation = await locationsController.findOne(
        'hjudasfhasdu-18473-mnksadfjs-1924903',
      );
      expect(foundLocation).toEqual(locationMock);
    });

    it('should be able to delete a location', async () => {
      const deletedLocation = await locationsController.remove(
        'hjudasfhasdu-18473-mnksadfjs-1924903',
      );
      expect(deletedLocation).toEqual(locationMock);
    });

    // it('should be able to findAll locations', async () => {
    //   const locations = await locationsController.findAll();
    //   expect(locations).toEqual([locationMock]);
    // });
  });
});
