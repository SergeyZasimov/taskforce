import { Injectable } from '@nestjs/common';
import { User, UserRole } from '@taskforce/shared-types';
import { ChangeTaskCounterQuery } from '../query/change-tasks-counter.query';
import { UserEntity } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly userRepository: UserRepository) {}

  public async update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.userRepository.update(id, new UserEntity(dto));
  }

  public async changeTasksCounter(
    id: string,
    query: ChangeTaskCounterQuery
  ): Promise<User> {
    return this.userRepository.changeTasksCounter(id, query);
  }

  public async getUser(id: string): Promise<User> {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new Error('User not found');
    }

    if (existUser.role === UserRole.Contractor) {
      return this.userRepository.findContractorById(id);
    }

    return existUser;
  }
}
