import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

const mockUserModel = {
  findById: jest.fn().mockReturnValue({
    id: 'validId',
    username: 'username',
    roles: 'roles',
    password: 'password',
  }),
  findOne: jest.fn().mockReturnValue({
    id: 'validId',
    username: 'username',
    roles: 'roles',
    password: 'password',
  }),
  create: jest.fn().mockResolvedValue({
    id: 'validId',
    username: 'username',
    roles: 'roles',
    password: 'password',
  }),
};

const mockRoleModel = {
  findById: jest.fn().mockReturnValue({ id: 'roleId', role: 'rolename' }),
  findOne: jest.fn().mockReturnValue({ id: 'roleId', role: 'rolename' }),
  create: jest.fn().mockResolvedValue({ id: 'roleId', role: 'rolename' }),
};

const hashPassword = jest.fn().mockReturnValue('hashpassword');

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        hashPassword,
        { provide: 'UserModel', useValue: mockUserModel },
        { provide: 'RoleModel', useValue: mockRoleModel },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find by id', async () => {
    const userObj = {
      id: 'validId',
      username: 'username',
      roles: 'roles',
      password: undefined,
    };
    const result = await service.findById('validId');

    expect(result).toBeDefined();
    expect(result).toEqual(userObj);
    expect(mockUserModel.findById).toHaveBeenCalled();
  });

  it('should find user by email', async () => {
    const userObj = {
      id: 'validId',
      username: 'username',
      roles: 'roles',
      password: 'password',
    };
    const result = await service.findOne('userEmail');

    expect(result).toBeDefined();
    expect(result).toEqual(userObj);
    expect(mockUserModel.findOne).toHaveBeenCalled();
  });

  it('should find user role by rolename', async () => {
    const roleObj = {
      id: 'roleId',
      role: 'rolename',
    };
    const result = await service.findRole('rolename');

    expect(result).toBeDefined();
    expect(result).toEqual(roleObj);
    expect(mockRoleModel.findOne).toHaveBeenCalled();
  });

  it('should find user role by id', async () => {
    const roleObj = {
      id: 'roleId',
      role: 'rolename',
    };
    const result = await service.findRoleById('roleId');

    expect(result).toBeDefined();
    expect(result).toEqual(roleObj);
    expect(mockRoleModel.findById).toHaveBeenCalled();
  });

  it('should create role', async () => {
    const roleObj = {
      id: 'roleId',
      role: 'rolename',
    };
    const result = await service.createRole('rolename');

    expect(result).toBeDefined();
    expect(result).toEqual(roleObj);
    expect(mockRoleModel.create).toHaveBeenCalled();
  });

  it('should create user', async () => {
    const userObj = {
      id: 'validId',
      username: 'username',
      roles: 'roles',
      password: 'password',
    };
    await service.create({
      username: 'username',
      password: 'password',
      roles: 'roles',
    });

    expect(mockRoleModel.create).toHaveBeenCalled();
  });
});
