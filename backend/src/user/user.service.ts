import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PartialUpdateUserDto, ReplaceUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDetails } from './user-details.interface';
import { RegisterCredentialsDto } from '@/auth';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email });
  }

  createUser(createUserDto: RegisterCredentialsDto): Promise<User> {
    const user: User = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.hashedPassword = createUserDto.password;
    return this.userRepository.save(user);
  }

  async findAllUser(): Promise<User[]> {
    const users = this.userRepository.find({
      relations: ['notes'],
    });
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  async findOneUser(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  _getUserDetails(user: User): UserDetails {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async partialUpdateUser(
    id: number,
    partialUpdateUserDto: PartialUpdateUserDto,
  ): Promise<User> {
    const user: User = await this.findOneUser(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, partialUpdateUserDto);

    return this.userRepository.save(user);
  }

  async replaceUser(id: number, replaceUserDto: ReplaceUserDto): Promise<User> {
    const user: User = await this.findOneUser(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    user.name = replaceUserDto.name;
    user.email = replaceUserDto.email;
    user.hashedPassword = replaceUserDto.password;

    return this.userRepository.save(user);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
