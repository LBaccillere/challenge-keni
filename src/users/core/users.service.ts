import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'src/commons/types/uuid';
import { CreateUserDto } from '../presentation/requests/createUser.dto';
import { Role, User } from './user.schema';
import { v4 as uuidv4 } from 'uuid';
import { UsersRepository } from './users.repository';
import { EncryptService } from 'src/commons/services/encrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject('UsersRepository') private userRepository: UsersRepository,
    private encryptService: EncryptService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User(
      uuidv4(),
      createUserDto.name,
      createUserDto.email,
      await this.encryptService.encrypt(createUserDto.password),
      Role.USER,
    );
    return this.userRepository.create(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  findOne(uuid: UUID): Promise<User> {
    return this.userRepository.findOne(uuid);
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findByEmail(email);
  }
}
