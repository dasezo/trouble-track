import { ConflictException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Query } from 'mongoose';
import { User, UserDocument } from '../common/schemas/User.schema';
import { CreateUserDto } from './dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<UserDocument>;
  const mockUserModel = {
    findById: jest.fn().mockImplementation(() => mockUser),
    create: jest.fn().mockImplementation(async () => Promise.resolve(mockUser)),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };
  const mockUser = {
    _id: '663f34965db2e79c075ffa6d',
    name: 'Horace Ward',
    email: 'Hermina9@yahoo.com',
    password: '$2b$10$cLrMmLIaooO/zO/HwgAbKOvZx0xMyTAQjNxaNh1l7ngsRSiRHivl2',
    createdAt: '2024-05-11T09:04:22.482Z',
    updatedAt: '2024-05-11T09:04:22.708Z',
    refreshToken:
      '$2b$10$7HmToJxV8GZZyLGaCdzb0OeiLkFJbbgMCoI6Yl0xuiPgJEyrkYXBO',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne: Find user by id', () => {
    it('should return a user', async () => {
      const result = await service.findOne(mockUser._id);

      expect(model.findById).toHaveBeenCalledWith(mockUser._id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('create: Create a user', () => {
    const dto: CreateUserDto = {
      name: 'Horace Ward',
      email: 'Hermina9@yahoo.com',
      password: '$2b$10$cLrMmLIaooO/zO/HwgAbKOvZx0xMyTAQjNxaNh1l7ngsRSiRHivl2',
    };

    it('should create a user and return it back', async () => {
      jest
        .spyOn(model, 'findOne')
        .mockReturnThis()
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(null),
        } as unknown as Query<UserDocument, any>);
      expect(await service.create(dto as CreateUserDto)).toEqual(mockUser);
    });

    it('should throw conflict exception (duplicated email)', async () => {
      jest
        .spyOn(model, 'findOne')
        .mockReturnThis()
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(mockUser),
        } as unknown as Query<UserDocument, any>);
      await expect(service.create(dto as CreateUserDto)).rejects.toEqual(
        new ConflictException('User already exists'),
      );
    });
  });

  describe('update: update user data', () => {
    it('should return updated user data', async () => {
      jest
        .spyOn(model, 'findByIdAndUpdate')
        .mockReturnThis()
        .mockReturnValue({
          exec: jest.fn().mockResolvedValueOnce(mockUser),
        } as unknown as Query<UserDocument, any>);

      await expect(
        service.update(mockUser._id, mockUser),
      ).resolves.toMatchObject(mockUser);
    });
  });
});
