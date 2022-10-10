import { Test, TestingModule } from '@nestjs/testing';
import { commentMock } from 'test/__mocks__/comment';
import { CommentsController } from '../../../src/modules/comments/comments.controller';
import { CommentsService } from '../../../src/modules/comments/comments.service';

describe('CommentsController', () => {
  let commentsController: CommentsController;
  let commentsService: CommentsService;

  beforeEach(async () => {
    const mockCommentService = {
      provide: CommentsService,
      useValue: {
        findAll: jest.fn().mockResolvedValue([commentMock]),
        create: jest.fn().mockResolvedValue(commentMock),
        findOne: jest.fn().mockResolvedValue(commentMock),
        update: jest.fn().mockResolvedValue(commentMock),
        remove: jest.fn().mockResolvedValue(commentMock),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService, mockCommentService],
    }).compile();

    commentsController = module.get<CommentsController>(CommentsController);
    commentsService = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(commentsController).toBeDefined();
    expect(commentsService).toBeDefined();
  });

  describe('success case', () => {
    const comment = {
      id: 'aaaaa',
      text: 'gostei gostei',
      ownerId: 'bbbbb',
      postId: 'cccc',
    };

    it('should be able to update a comment', async () => {
      const updatedComment = await commentsController.update(
        'aaaaa',
        {
          text: 'Localização mock alterado',
        },
      );
      expect(updatedComment).toEqual(commentMock);
    });

    it('should be able to create a comment', async () => {
      const createdComment = await commentsController.create(" ", comment);
      expect(createdComment).toEqual(commentMock);
    });

    it('should be able to find one comment', async () => {
      const foundComment = await commentsController.findOne(
        'aaaaa',
      );
      expect(foundComment).toEqual(commentMock);
    });

    it('should be able to delete a comment', async () => {
      const deletedComment = await commentsController.remove(
        'aaaaa',
      );
      expect(deletedComment).toEqual(commentMock);
    });

    it('should be able to findAll comments', async () => {
      const comments = await commentsController.findAll();
      expect(comments).toEqual([commentMock]);
    });
  });
});
