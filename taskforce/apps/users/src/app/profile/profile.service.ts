import { Injectable } from '@nestjs/common';
import { User } from '@taskforce/shared-types';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  public async update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, new UserEntity(dto));
  }
}
