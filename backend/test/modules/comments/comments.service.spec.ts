import { commentMock, deleteCommentMock } from './../../__mocks__/comment';
import { CommentsService } from './../../../src/modules/comments/comments.service';
import { createPrismaProviderMock } from 'test/__mocks__/prisma';
import { PrismaService } from 'src/shared/database/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { deletedlikeMock } from 'test/__mocks__/like';

describe('CommentsService', () => {
  let commentService: CommentsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService, createPrismaProviderMock()],
    }).compile();

    commentService = module.get<CommentsService>(CommentsService);
    prisma = module.get<PrismaService>(PrismaService);

    prisma.comment.create = jest.fn().mockResolvedValue(commentMock);
    prisma.comment.delete = jest.fn().mockResolvedValue(deletedlikeMock);
    prisma.comment.update = jest.fn().mockResolvedValue({
      ...commentMock,
      comment: 'novo comentário',
    });
    prisma.comment.findUnique = jest.fn().mockResolvedValue(undefined);
  });

  it('should be defined', () => {
    expect(commentService).toBeDefined();
  });

  it('should be able to create a comment with success', async () => {
    const comment1 = {
      id: 'aaaaa',
      text: 'gostei gostei',
      ownerId: 'bbbbb',
      postId: 'cccc',
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    };

    const createdComment = await commentService.create(comment1);
    expect(createdComment).toEqual(commentMock);
  });

  it('should be able to delete a comment with success', async () => {
    
    const deletedComment = await commentService.remove({
      id:'aaaaa',
      postId:'cccc',
    },
    );
    expect(deletedComment).toEqual(deleteCommentMock);
  });

  it('should be able to update a comment with success', async () => {
    const commentToUpdate = {
      text: 'novo comentário',
    };

    const commentUpdated = await commentService.update(
      commentMock.id,
      commentToUpdate,
    );

    expect(commentUpdated).toEqual({
      ...commentMock,
      comment: 'novo comentário',
    });
  });

  it('should not be able to get one comment that doesnt exist', async () => {
    prisma.comment.findUnique = jest.fn().mockRejectedValue(undefined);

    await expect(commentService.findOne("1")).rejects.toThrowError(
      'Comment with this id was not found.'
    );
  });
});
