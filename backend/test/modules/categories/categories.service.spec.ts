import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from 'src/modules/categories/categories.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { categoryMock} from 'test/__mocks__/category';
import { createPrismaProviderMock } from 'test/__mocks__/prisma';

describe('CategoriesService', () => {
    let categoryService: CategoriesService;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoriesService, createPrismaProviderMock()],
          }).compile();

          categoryService = module.get<CategoriesService>(CategoriesService);
          prisma = module.get<PrismaService>(PrismaService);

          prisma.category.create = jest.fn().mockResolvedValue(categoryMock);
          prisma.category.delete = jest.fn().mockResolvedValue(categoryMock);
          prisma.category.update = jest.fn().mockResolvedValue({
              ...categoryMock,
              title: 'novo título da categoria',
              description: 'nova descrição',
          });
          
    })
})