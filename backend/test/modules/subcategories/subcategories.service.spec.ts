import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoriesService } from 'src/modules/subcategories/subcategories.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { subcategoryMock } from 'test/__mocks__/subcategory';
import { createPrismaProviderMock } from 'test/__mocks__/prisma';

describe('SubcategoriesService', () => {
  let subcategoryService: SubcategoriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubcategoriesService, createPrismaProviderMock()],
    }).compile();

    subcategoryService = module.get<SubcategoriesService>(SubcategoriesService);
    prisma = module.get<PrismaService>(PrismaService);

    prisma.subcategory.create = jest.fn().mockResolvedValue(subcategoryMock);
    prisma.subcategory.delete = jest.fn().mockResolvedValue(subcategoryMock);
    prisma.subcategory.update = jest.fn().mockResolvedValue({
      ...subcategoryMock,
      title: 'novo título da subcategoria',
      description: 'descrição atualizada de subcategoria',
    });
  });

  it('should be defined', () => {
    expect(subcategoryService).toBeDefined();
  });

  it('should be able to create a subcategory with success', async () => {
    const subcategory1 = {
      id: 'aaaaaa-1111',
      name: 'especificação x',
      title: 'subcategoria de saúde específica',
      description: 'subcategoria de saúde',
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
      ownerId: '01923408oaskfjoasdj=jiasfjsdi-oiashjdfk',
      categoryId: 'aaaaaa-1111-aaaaaaa-1111',
    };

    const createdSubcategory = await subcategoryService.create(subcategory1);
    expect(createdSubcategory).toEqual(subcategoryMock);
  });

  it('should be able to delete a subcategory with success', async () => {
    const deletedSubcategory = await subcategoryService.remove(
      'aaaaaa-1111-aaaaaaa-1111',
    );
    expect(deletedSubcategory).toEqual(subcategoryMock);
  });

  it('should be able to update a subcategory with success', async () => {
    const subcategoryToUpdate = {
      name: 'novo nome da subcategoria',
    };

    const subcategoryUpdated = await subcategoryService.update(
      subcategoryMock.text,
      subcategoryToUpdate,
    );

    expect(subcategoryUpdated).toEqual({
      ...subcategoryMock,
      title: 'novo título da subcategoria',
      description: 'descrição atualizada de subcategoria',
    });
  });

  it('should be able to get one subcategory by id with success', async () => {
    prisma.subcategory.findUnique = jest.fn().mockResolvedValue(subcategoryMock);
    const foundSubcategory = await subcategoryService.findOne(
      'aaaaaa-1111-aaaaaaa-1111',
    );

    const expectedSubcategory = {
      ...subcategoryMock,
    };

    expect(foundSubcategory).toEqual(expect.objectContaining(expectedSubcategory));
  });

});
