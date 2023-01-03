import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@taskforce/shared-types';
import { Expose, Transform } from 'class-transformer';
import * as dayjs from 'dayjs';

export class ProfileRdo {
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  @ApiProperty({
    description: 'User ID',
    example: '6382db68d4aa0280d04bb17f',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'User name',
    example: 'John Smith',
  })
  public name: string;

  @Expose()
  @ApiProperty({
    description: 'User email',
    example: 'user@mail.com',
  })
  public email: string;

  @Expose()
  @ApiProperty({
    description: 'URL to avatar image',
    example: 'http://localhost:3333/upload/user1-avatar.png',
  })
  public avatar: string;

  @Expose()
  @ApiProperty({
    description: 'One of the available cities',
    example: 'Москва',
  })
  public city: string;

  @Expose()
  @ApiProperty({
    description: 'User role',
    example: 'Customer',
  })
  public role: string;

  @ApiProperty({
    description: 'User birthday',
    example: '2022-11-20',
  })
  @Expose({ name: 'birthday' })
  @Transform(({ value }) => dayjs().diff(dayjs(value), 'y'))
  public age: number;

  @Expose({ groups: [UserRole.Customer] })
  public tasksCount: number;

  @Expose({ groups: [UserRole.Customer] })
  public newTasksCount: number;

  @Expose({ groups: [UserRole.Contractor] })
  public completedTasksCount: number;

  @Expose({ groups: [UserRole.Contractor] })
  public failedTasksCount: number;

  @Expose({ groups: [UserRole.Contractor] })
  public specialty: string[];

  @Expose({ name: 'createdAt' })
  public register: string;

  @Expose()
  public resume: string;

  @Expose({ groups: [UserRole.Contractor] })
  public rating: number;

  @Expose({ groups: [UserRole.Contractor] })
  public ratingPlace: number;
}
