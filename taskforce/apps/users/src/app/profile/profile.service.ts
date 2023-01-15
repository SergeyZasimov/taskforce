import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { User } from '@taskforce/shared-types';
import { USER_NOT_FOUND } from '../app.constant';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UpdateUserAvatarDto } from './dto/update-user-avatar.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  public async update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, new UserEntity(dto));
  }

  public async getUser(id: string): Promise<User> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return existUser;
  }

  public async updateAvatar(
    id: string,
    dto: UpdateUserAvatarDto
  ): Promise<User> {
    const { avatar } = dto;
    const avatarPath = `http://${process.env.HOST}:${process.env.PORT}/${process.env.UPLOAD_DEST}/${avatar}`;
    return this.userRepository.update(id, { avatar: avatarPath });
  }
}
