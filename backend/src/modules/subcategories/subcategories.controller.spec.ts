import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoriesController } from './subcategories.controller';
import { SubcategoriesService } from './subcategories.service';

describe('SubcategoriesController', () => {
  let controller: SubcategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubcategoriesController],
      providers: [SubcategoriesService],
    }).compile();

    controller = module.get<SubcategoriesController>(SubcategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
