import { Test, TestingModule } from '@nestjs/testing';
import { categoryMock } from 'test/__mocks__/category';
import { CategoriesController } from '../../../src/modules/categories/categories.controller';
import { CategoriesService } from '../../../src/modules/categories/categories.service';

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const mockCategoryService = {
      provide: CategoriesService,
      useValue: {
        findAll: jest.fn().mockResolvedValue([categoryMock]),
        create: jest.fn().mockResolvedValue(categoryMock),
        findOne: jest.fn().mockResolvedValue(categoryMock),
        update: jest.fn().mockResolvedValue(categoryMock),
        remove: jest.fn().mockResolvedValue(categoryMock),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [CategoriesService, mockCategoryService],
    }).compile();

    categoriesController =
      module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
    expect(categoriesService).toBeDefined();
  });

  describe('success case', () => {
    const category = {
      id: 'aaaaaa-1111-aaaaaaa-1111',
      name: 'Categoria mock',
      title: 'Titulo da categoria mock',
      ownerId: '01923408oaskfjoasdj=jiasfjsdi-oiashjdfk',
    };

    it('should be able to update a category', async () => {
      const updatedCategory = await categoriesController.update(
        'aaaaaa-1111-aaaaaaa-1111',
        {
          title: 'categoria mock alterado',
        },
      );
      expect(updatedCategory).toEqual(categoryMock);
    });

    it('should be able to create a category', async () => {
      const createdCategory = await categoriesController.create(category);
      expect(createdCategory).toEqual(categoryMock);
    });

    it('should be able to find one category', async () => {
      const foundCategory = await categoriesController.findOne(
        'aaaaaa-1111-aaaaaaa-1111',
      );
      expect(foundCategory).toEqual(categoryMock);
    });

    it('should be able to delete a category', async () => {
      const deletedCategory = await categoriesController.remove(
        'aaaaaa-1111-aaaaaaa-1111',
      );
      expect(deletedCategory).toEqual(categoryMock);
    });

    it('should be able to findAll categories', async () => {
      const categories = await categoriesController.findAll();
      expect(categories).toEqual([categoryMock]);
    });
  });
});
