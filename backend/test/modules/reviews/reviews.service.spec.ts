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
      providers: [ReviewsService, createPrismaProviderMock()],
    }).compile();

    reviewService = module.get<ReviewsService>(ReviewsService);
    prisma = module.get<PrismaService>(PrismaService);

    prisma.review.create = jest.fn().mockResolvedValue(reviewMock);
    prisma.review.delete = jest.fn().mockResolvedValue(reviewMock);
    prisma.review.update = jest.fn().mockResolvedValue({
      ...reviewMock,
      text: 'Nova descrição do review'
    });
    prisma.review.findUnique = jest.fn().mockResolvedValue({
      ...reviewMock,
      id: 'aaaaaaaa'
    })
  });

  it('should be defined', () => {
    expect(reviewService).toBeDefined();
  });

  it('should be able to create a review for a location', async () => {
    const review = {
      id: 'sdasdasdasd-1-23-12-3-1',
      ownerId: 'aaaaa111aa',
      locationId: 'ab2222bbbbbbb',
      createdAt: '2022-01-01T01:01:01.000Z',
      deletedAt: '2022-01-01T01:01:01.000Z',
      stars: 2,
      text: 'iiiiii',
    };
    const createdReview = await reviewService.create(review);
    expect(createdReview).toEqual(reviewMock);
  });

  it('should be able update a review with success', async () => {
    const reviewToUpdate = {
      text: 'Nova descrição do review',
    };

    const reviewUpdated = await reviewService.update(
      reviewMock.id,
      reviewToUpdate,
    );

    expect(reviewUpdated).toEqual({
      ...reviewMock,
      text: 'Nova descrição do review',
    });
  });

  it('should be able to delete a review with success', async () => {
    const deletedReview = await reviewService.remove(
      'pipipipipi-00000-popopopo-001111',
    );
    expect(deletedReview).toEqual(reviewMock);
  });

  it('should be able to get one review by id with success', async () => {
    prisma.review.findUnique = jest.fn().mockResolvedValue(reviewMock);
    const foundReview = await reviewService.findOne(
      'pipipipipi-00000-popopopo-001111',
    );

    const expectedReview = {
      ...reviewMock,
    };

    expect(foundReview).toEqual(expect.objectContaining(expectedReview));
  });

  it('should not be able to get a review that doest exists', async () => {
    prisma.review.findUnique = jest.fn().mockResolvedValue(undefined);

    await expect(
      reviewService.findOne('1'),
    ).rejects.toThrowError(
      'Review 1 was not found',
    );
  });
});
