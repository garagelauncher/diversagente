import { Test, TestingModule } from '@nestjs/testing';
import { ReviewsService } from 'src/modules/reviews/reviews.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { reviewMock } from 'test/__mocks__/review';
import { createPrismaProviderMock } from 'test/__mocks__/prisma';

describe('ReviewsService', () => {
  let reviewService: ReviewsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReviewsService, createPrismaProviderMock ()],
    }).compile();

    reviewService = module.get<ReviewsService>(ReviewsService);
    prisma = module.get<PrismaService>(PrismaService);

    prisma.review.create = jest.fn().mockResolvedValue(reviewMock);
    prisma.review.delete = jest.fn().mockResolvedValue(reviewMock);
    prisma.review.update = jest.fn().mockResolvedValue({
      ...reviewMock,
      text: 'teste',
      stars: 3,
    });
  });

    it('should be defined', () => {
      expect(reviewService).toBeDefined();
    });

    it('should be able to create a review for a location', async () => {
      const review = {
        id: 'pipipipipi-00000-popopopo-000000',
        ownerId: 'aaaaaa',
        locationId: 'abbbbbbbb',
        createdAt: '2022-01-01T01:01:01.000Z',
        deletedAt: '2022-01-01T01:01:01.000Z',
        stars: 2,
        text: 'iiiiii'
      };
    const createdReview = await reviewService.create(review);
    expect(createdReview).toEqual(reviewMock)
    })

    it('should be able to delete a location with success', async () => {
      const deletedReview = await reviewService.remove(
        'pipipipipi-00000-popopopo-001111',
      );
      expect(deletedReview).toEqual(reviewMock);
    });


  })
