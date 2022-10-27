import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/modules/users/users.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { userMock } from 'test/__mocks__/user';
import { createPrismaProviderMock } from 'test/__mocks__/prisma';

describe('UsersService', () => {
  let userService: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, createPrismaProviderMock()],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);

    prisma.user.create = jest.fn().mockResolvedValue(userMock);
    prisma.user.delete = jest.fn().mockResolvedValue(userMock);
    prisma.user.update = jest.fn().mockResolvedValue({
      ...userMock,
      username: 'novoUsername',
    });
    prisma.user.findUnique = jest.fn().mockResolvedValue({
      ...userMock,
  });
});

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should be able to create a user with success', async () => {
    const user = {
      email: "gabriel@email.com",
      username: "gabiru",
      name: "gabriel"
      }

    const createdUser = await userService.create(user);
    expect(createdUser).toEqual(userMock);
  });

  it('should be able to delete a user with success', async () => {
    const deletedUser = await userService.remove(
      'aaaaaa-2222',
    );
    expect(deletedUser).toEqual(userMock);
  });

  it('should be able update a user with success', async () => {
    const userToUpdate = {
      username: 'novoUsername',
    };

    const userUpdated = await userService.update(
      userMock.id,
      userToUpdate,
    );

    expect(userUpdated).toEqual({
      ...userMock,
      username: 'novoUsername',
    });
  });

  it('should be able to get one user by id with success', async () => {
    const foundUser = await userService.findOne(
      'aaaaaa-2222',
    );

    const expectedUser = {
      ...userMock,
    };

    expect(foundUser).toEqual(expect.objectContaining(expectedUser));
  });

  it('should not be able to get one user that doesnt exist', async () => {
    prisma.user.findUnique = jest.fn().mockResolvedValue(undefined);

    await expect(userService.findOne('1')).rejects.toThrowError(
      'User with id 1 not found',
    );
  });
});
