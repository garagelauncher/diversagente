import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/modules/users/users.service';
import { PrismaService } from 'src/shared/database/prisma.service';
import { userMock } from 'test/__mocks__/user';
import { createPrismaProviderMock } from 'test/__mocks__/prisma';
import { CloudinaryService } from 'src/shared/services/cloudinary/cloudinary.service';

describe('UsersService', () => {
  let userService: UsersService;
  let prisma: PrismaService;

  const mockCloudinaryService = {
    provide: CloudinaryService,
    useValue: {
      uploadImage: jest.fn(),
    },
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, mockCloudinaryService, createPrismaProviderMock()],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);

    prisma.user.create = jest.fn().mockResolvedValue(userMock);
    prisma.user.update = jest.fn().mockResolvedValue({
      ...userMock,
      username: 'novoUsername',
    });
});

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should be able to create a user with success', async () => {
    const user = {
      id: 'aaaaaa-1111',
      email: "gabriel@email.com",
      username: "gabiru",
      name: "gabriel",
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
      }

    const createdUser = await userService.create(user);
    expect(createdUser).toEqual(userMock);
  });

  it('should be able to delete a user with success', async () => {

    prisma.user.update = jest.fn().mockResolvedValue({
      ...userMock
    });

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
    prisma.user.findUnique = jest.fn().mockResolvedValue({
      ...userMock,
  });

    const foundUser = await userService.findOne(
      'aaaaaa-2222',
    );

    const expectedUser = {
      ...userMock,
    };

    expect(foundUser).toEqual(expect.objectContaining(expectedUser));
  });

});
