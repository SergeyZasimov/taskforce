import { Injectable } from '@nestjs/common';
import { User, UserRole } from '@taskforce/shared-types';
import { UserEntity } from '../user/user.entity';
import { AUTH_USER_EXIST_ERROR } from './auth.const';
import { CreateUserDto } from './dto/create-user.dto';
import * as dayjs from 'dayjs';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: CreateUserDto): Promise<User> {
    const { name, email, city, birthday, password } = dto;

    const newUser: User = {
      email,
      name,
      city,
      birthday: dayjs(birthday).toDate(),
      role: UserRole.Customer,
    };

    const existUser = await this.userRepository.findByEmail(newUser.email);

    if (existUser) {
      throw new Error(AUTH_USER_EXIST_ERROR);
    }

    const newUserEntity: UserEntity = await new UserEntity(newUser).setPassword(
      password
    );

    return await this.userRepository.create(newUserEntity);
  }

  public async verifyUser(dto: LoginUserDto): Promise<User> {
    const { email, password } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new Error('User not found');
    }

    const verifyUserEntity = new UserEntity(existUser);

    if (!(await verifyUserEntity.comparePassword(password))) {
      throw new Error('Wrong password');
    }

    return verifyUserEntity.toObject();
  }

  public async getUser(id: string): Promise<User> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new Error('User not found');
    }

    return existUser;
  }
}
