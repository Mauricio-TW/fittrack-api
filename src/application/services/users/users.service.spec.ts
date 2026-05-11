import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UserEntity } from '../../../infra/database/entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  it('deve listar usuários', async () => {
    const users = [
      {
        id: '1',
        name: 'Douglas',
        email: 'doug@email.com',
        createdAt: new Date(),
      },
    ];

    mockRepository.find.mockResolvedValue(users);

    const result = await service.findAll();

    expect(result).toEqual(users);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('deve impedir cadastro com email duplicado', async () => {
    mockRepository.findOne.mockResolvedValue({
      id: '1',
      email: 'doug@email.com',
    });

    await expect(
      service.create({
        name: 'Douglas',
        email: 'doug@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });

  it('deve criar usuário com sucesso', async () => {
    const userData = {
      name: 'Douglas',
      email: 'douglas@email.com',
      password: '123456',
    };

    const createdUser = {
      id: '1',
      ...userData,
      createdAt: new Date(),
    };

    mockRepository.findOne.mockResolvedValue(null);
    mockRepository.create.mockReturnValue(createdUser);
    mockRepository.save.mockResolvedValue(createdUser);

    const result = await service.create(userData);

    expect(result).toEqual(createdUser);
    expect(mockRepository.create).toHaveBeenCalled();
    expect(mockRepository.save).toHaveBeenCalled();
  });
});