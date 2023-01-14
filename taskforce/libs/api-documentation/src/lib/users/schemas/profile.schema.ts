import { ApiProperty } from '@nestjs/swagger';

export class ProfileSchema {
  @ApiProperty({
    description: 'ID пользователя',
    example: '6382db68d4aa0280d04bb17f',
  })
  public id: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Smith',
  })
  public name: string;

  @ApiProperty({
    description: 'Email пользователя',
    example: 'user@mail.com',
  })
  public email: string;

  @ApiProperty({
    description: 'Аватар',
    example: 'http://localhost:3333/upload/user1-avatar.png',
  })
  public avatar: string;

  @ApiProperty({
    description: 'Город пользователя',
    example: 'Москва',
  })
  public city: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'Customer',
  })
  public role: string;

  @ApiProperty({
    description: 'Возраст пользователя',
    example: '23',
  })
  public age: number;

  @ApiProperty({
    description: 'Специализация пользователя(для "исполнителя")',
    example: '["строительство", "ремонт"]',
    type: 'string[]',
    required: false,
  })
  public specialty: string[];

  @ApiProperty({
    description: 'Дата регистрации',
    example: '2022-12-27T16:15:59.031Z',
  })
  public register: string;

  @ApiProperty({
    description: 'Информация о пользователе',
    example:
      'Соответствующих напрямую рамки модернизации обучения позиции обществом предпосылки принципов сомнений. Роль мира экономической кадров отношении рамки работы отношении формировании проблем. Прежде формирования общественной.',
  })
  public resume: string;
}
