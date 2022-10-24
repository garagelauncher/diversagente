import { Test, TestingModule } from '@nestjs/testing';
import { reviewMock } from 'test/__mocks__/review';
import { ReviewsController } from '../../../src/modules/reviews/reviews.controller';
import { ReviewsService } from '../../../src/modules/reviews/reviews.service';

describe('ReviewsController', () => {
  let reviewsController: ReviewsController;
  let reviewsService: ReviewsService;

  beforeEach(async () => {
    const mockReviewService = {
      provide: ReviewsService,
      useValue: {
        findAll: jest.fn().mockResolvedValue([reviewMock]),
        create: jest.fn().mockResolvedValue(reviewMock),
        findOne: jest.fn().mockResolvedValue(reviewMock),
        update: jest.fn().mockResolvedValue(reviewMock),
        remove: jest.fn().mockResolvedValue(reviewMock),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [ReviewsService, mockReviewService],
    }).compile();

    reviewsController = module.get<ReviewsController>(ReviewsController);
    reviewsService = module.get<ReviewsService>(ReviewsService);
  });

  it('should be defined', () => {
    expect(reviewsController).toBeDefined();
    expect(reviewsService).toBeDefined();
  });

  describe('success case', () => {
    const review = {
      id: 'pipipipipi-00000-popopopo-001111',
      ownerId: '',
      locationId: '',
      stars: 4,
      text: 'aoooooba',
    };

    it('should be able to update a review', async () => {
      const updatedReview = await reviewsController.update(
        'pipipipipi-00000-popopopo-001111',
        {
          text: 'aaaaaaaaa',
        },
      );
      expect(updatedReview).toEqual(reviewMock);
    });

    it('should be able to create a review', async () => {
      const createdReview = await reviewsController.create("", review);
      expect(createdReview).toEqual(reviewMock);
    });

    it('should be able to find one review', async () => {
      const foundReview = await reviewsController.findOne(
        'pipipipipi-00000-popopopo-001111',
      );
      expect(foundReview).toEqual(reviewMock);
    });

    it('should be able to delete a review', async () => {
      const deletedReview = await reviewsController.remove(
        'pipipipipi-00000-popopopo-001111',
      );
      expect(deletedReview).toEqual(reviewMock);
    });

    it('should be able to findAll reviews', async () => {
      const reviews = await reviewsController.findAll('hjudasfhasdu-18473-mnksadfjs-1924903');
      expect(reviews).toEqual([reviewMock]);
    });
  });
});
