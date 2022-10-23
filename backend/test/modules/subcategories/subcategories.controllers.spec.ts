import { Test, TestingModule } from '@nestjs/testing';
import { subcategoryMock } from 'test/__mocks__/subcategory';
import { SubcategoriesController } from '../../../src/modules/subcategories/subcategories.controller';
import { SubcategoriesService } from '../../../src/modules/subcategories/subcategories.service';

describe('SubcategoriesController', () => {
  let subcategoriesController: SubcategoriesController;
  let subcategoriesService: SubcategoriesService;

  beforeEach(async () => {
    const mockSubcategoryService = {
      provide: SubcategoriesService,
      useValue: {
        findAll: jest.fn().mockResolvedValue([subcategoryMock]),
        create: jest.fn().mockResolvedValue(subcategoryMock),
        findOne: jest.fn().mockResolvedValue(subcategoryMock),
        update: jest.fn().mockResolvedValue(subcategoryMock),
        remove: jest.fn().mockResolvedValue(subcategoryMock),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubcategoriesController],
      providers: [SubcategoriesService, mockSubcategoryService],
    }).compile();

    subcategoriesController = module.get<SubcategoriesController>(SubcategoriesController);
    subcategoriesService = module.get<SubcategoriesService>(SubcategoriesService);
  });

  it('should be defined', () => {
    expect(subcategoriesController).toBeDefined();
    expect(subcategoriesService).toBeDefined();
  });

  describe('success case', () => {
    const subcategory = {
      id: 'aaaaaa-1111',
      name: 'especificação x',
      text: 'subcategoria de saúde específica',
      title: "a"
    };

    it('should be able to update a subcategory', async () => {
      const updatedSubcategory = await subcategoriesController.update(
        'aaaaaa-1111',
        {
          title: 'Localização mock alterado',
        },
      );
      expect(updatedSubcategory).toEqual(subcategoryMock);
    });

    it('should be able to create a subcategory', async () => {
      const createdSubcategory = await subcategoriesController.create(subcategory);
      expect(createdSubcategory).toEqual(subcategoryMock);
    });

    it('should be able to find one subcategory', async () => {
      const foundSubcategory = await subcategoriesController.findOne(
        'aaaaaa-1111',
      );
      expect(foundSubcategory).toEqual(subcategoryMock);
    });

    it('should be able to delete a subcategory', async () => {
      const deletedSubcategory = await subcategoriesController.remove(
        'aaaaaa-1111',
      );
      expect(deletedSubcategory).toEqual(subcategoryMock);
    });

    it('should be able to findAll subcategories', async () => {
      const subcategories = await subcategoriesController.findAll();
      expect(subcategories).toEqual([subcategoryMock]);
    });
  });
});
