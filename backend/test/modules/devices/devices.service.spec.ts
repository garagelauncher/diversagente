import { Test, TestingModule } from '@nestjs/testing';
import { DevicesService } from 'src/modules/devices/devices.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { createPrismaProviderMock } from 'test/__mocks__/prisma';

describe('DevicesService', () => {
  let devicesService: DevicesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevicesService, createPrismaProviderMock()],
    }).compile();

    devicesService = module.get<DevicesService>(DevicesService);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.device.create = jest.fn().mockResolvedValue({
      id: '234324',
      ownerId: 'ownerId',
      token: 'token',
      platform: 'platform',
    });
  });

  it('should be defined', () => {
    expect(devicesService).toBeDefined();
  });
});
