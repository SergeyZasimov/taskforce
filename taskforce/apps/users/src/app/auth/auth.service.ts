import { Inject, Injectable } from '@nestjs/common';
import { User, UserRole, SubscribeEvent } from '@taskforce/shared-types';
import { UserEntity } from '../user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as dayjs from 'dayjs';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from '../user/user.repository';
import { UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { createEvent } from '@taskforce/core';
import { RABBITMQ_SERVICE_NAME } from '../app.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE_NAME) private readonly rabbitClient: ClientProxy
  ) {}

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
      throw new Error('User with this email is exist');
    }

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
      throw new UnauthorizedException('User not found');
    }

    const verifyUserEntity = new UserEntity(existUser);

    if (!(await verifyUserEntity.comparePassword(password))) {
      throw new UnauthorizedException('Wrong password');
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

  public async loginUser(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
