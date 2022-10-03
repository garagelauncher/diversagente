import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/shared/database/prisma.service';
import { postMock } from 'test/__mocks__/post';
import { createPrismaProviderMock } from 'test/__mocks__/prisma';
import { PostsService } from '../../../src/modules/posts/posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsService, createPrismaProviderMock()],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    prisma = module.get<PrismaService>(PrismaService);

    prisma.post.create = jest.fn().mockResolvedValue(postMock);
    prisma.post.delete = jest.fn().mockResolvedValue(postMock);
    prisma.post.findUnique = jest.fn().mockResolvedValue(postMock);
    prisma.post.update = jest.fn().mockResolvedValue(postMock);
    prisma.post.findMany = jest.fn().mockResolvedValue([postMock]);
  });

  it('should be defined', () => {
    expect(postsService).toBeDefined();
  });

  describe('success case', () => {
    const post = {
      title: 'Localização mock',
      content: 'Descrição da localização mock',
      ownerId: 'hjudasfhasdu-18473-mnksadfjs-1924903',
    };

    it('should be able to create a post', async () => {
      const createdPost = await postsService.create(post);
      expect(createdPost).toEqual(postMock);
    });

    it('should be able to find one post', async () => {
      const foundPost = await postsService.findOne(
        'hjudasfhasdu-18473-mnksadfjs-1924903',
      );
      expect(foundPost).toEqual(postMock);
    });

    it('should be able to delete a post', async () => {
      const deletedLocation = await postsService.remove(
        'hjudasfhasdu-18473-mnksadfjs-1924903',
      );
      expect(deletedLocation).toEqual(postMock);
    });

    it('should be able to update a post', async () => {
      const updatedPost = await postsService.update(
        'hjudasfhasdu-18473-mnksadfjs-1924903',
        {
          title: 'Localização mock alterado',
        },
      );
      expect(updatedPost).toEqual(postMock);
    });

    it('should be able to findAll posts', async () => {
      const posts = await postsService.findAll({});
      expect(posts).toEqual([postMock]);
    });
  });
});
