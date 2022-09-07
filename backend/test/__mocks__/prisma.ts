import { PrismaClient } from '@prisma/client';

import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { PrismaService } from 'src/shared/database/prisma.service';

type CreatePrismaProviderMockResponse = {
  provide: typeof PrismaService;
  useValue: DeepMockProxy<PrismaClient>;
};

export const createPrismaMock = (): DeepMockProxy<PrismaClient> => {
  return mockDeep<PrismaClient>();
};

export const createPrismaProviderMock =
  (): CreatePrismaProviderMockResponse => ({
    provide: PrismaService,
    useValue: createPrismaMock(),
  });
