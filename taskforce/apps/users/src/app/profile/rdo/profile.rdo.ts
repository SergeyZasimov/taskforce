import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@taskforce/shared-types';
import { Expose, Transform } from 'class-transformer';
import * as dayjs from 'dayjs';

export class ProfileRdo {
  @ApiProperty({
    description: 'ID пользователя',
    example: '6382db68d4aa0280d04bb17f',
  })
  @Expose({ name: '_id' })
  @Transform(({ obj }) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Smith',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@mail.com',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Аватар',
    example: 'http://localhost:3333/upload/user1-avatar.png',
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'Город пользователя',
    example: 'Москва',
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'Customer',
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'Возраст пользователя',
    example: '23',
  })
  @Expose({ name: 'birthday' })
  @Transform(({ value }) => dayjs().diff(dayjs(value), 'y'))
  public age: number;

  @ApiProperty({
    description: 'Специализация пользователя(для "исполнителя")',
    example: '["строительство", "ремонт"]',
    type: 'string[]',
    required: false,
  })
  @Expose({ groups: [UserRole.Contractor] })
  public specialty: string[];

  @ApiProperty({
    description: 'Дата регистрации',
    example: '2022-12-27T16:15:59.031Z',
  })
  @Expose({ name: 'createdAt' })
  public register: string;

  @ApiProperty({
    description: 'Информация о пользователе',
    example:
      'Соответствующих напрямую рамки модернизации обучения позиции обществом предпосылки принципов сомнений. Роль мира экономической кадров отношении рамки работы отношении формировании проблем. Прежде формирования общественной.',
  })
  @Expose()
  public resume: string;
}
