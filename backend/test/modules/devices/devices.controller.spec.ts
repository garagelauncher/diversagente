import { Test, TestingModule } from '@nestjs/testing';
import { deviceMock } from 'test/__mocks__/device';
import { DevicesController } from '../../../src/modules/devices/devices.controller';
import { DevicesService } from '../../../src/modules/devices/devices.service';

describe('DevicesController', () => {
  let controller: DevicesController;
  const mockDevicesService = {
    provide: DevicesService,
    useValue: {
      findAll: jest.fn().mockResolvedValue([deviceMock]),
      create: jest.fn().mockResolvedValue(deviceMock),
      findOne: jest.fn().mockResolvedValue(deviceMock),
      update: jest.fn().mockResolvedValue(deviceMock),
      remove: jest.fn().mockResolvedValue(deviceMock),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevicesController],
      providers: [DevicesService, mockDevicesService],
    }).compile();

    controller = module.get<DevicesController>(DevicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
