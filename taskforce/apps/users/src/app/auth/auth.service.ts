import { Inject, Injectable } from '@nestjs/common';
import {
  User,
  UserRole,
  SubscribeEvent,
  AccessTokenPayload,
} from '@taskforce/shared-types';
import { UserEntity } from '../user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as dayjs from 'dayjs';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from '../user/user.repository';
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@taskforce/core';
import {
  EXIST_USER_ERROR,
  RABBITMQ_SERVICE_NAME,
  USER_NOT_FOUND,
  WRONG_PASSWORD_ERROR,
} from '../app.constant';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE_NAME) private readonly rabbitClient: ClientProxy
  ) {}

  public async register(dto: CreateUserDto): Promise<User> {
    const { name, email, city, birthday, password } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(EXIST_USER_ERROR);
    }

    const newUser: User = {
      email,
      name,
      city,
      birthday: dayjs(birthday).toDate(),
      role: UserRole.Customer,
    };


    const newUserEntity: UserEntity = await new UserEntity(newUser).setPassword(
      password
    );

    const createdUser = await this.userRepository.create(newUserEntity);

    this.rabbitClient.emit(createEvent(SubscribeEvent.AddSubscriber), {
      email: createdUser.email,
    });

    return createdUser;
  }

  public async verifyUser(dto: LoginUserDto): Promise<User> {
    const { email, password } = dto;

    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const verifyUserEntity = new UserEntity(existUser);

    if (!(await verifyUserEntity.comparePassword(password))) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    return verifyUserEntity.toObject();
  }

  public async loginUser(user: User) {
    const payload: AccessTokenPayload = {
      sub: user._id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  public async changePassword(
    id: string,
    dto: ChangePasswordDto
  ): Promise<User> {
    const { currentPassword, newPassword } = dto;

    const existUser = await this.userRepository.findById(id);

    const userEntity = new UserEntity(existUser);

    const isValid = await userEntity.comparePassword(currentPassword);

    if (!isValid) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR);
    }

    const updatedUserEntity = await userEntity.setPassword(newPassword);
    const updatedUser = await this.userRepository.update(id, updatedUserEntity);
    return updatedUser;
  }
}
