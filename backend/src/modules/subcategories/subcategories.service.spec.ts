import { Test, TestingModule } from '@nestjs/testing';
import { SubcategoriesService } from './subcategories.service';

describe('SubcategoriesService', () => {
  let service: SubcategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubcategoriesService],
    }).compile();

    service = module.get<SubcategoriesService>(SubcategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
