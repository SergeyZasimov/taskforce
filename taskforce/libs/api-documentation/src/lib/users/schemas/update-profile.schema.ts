import { AvailableCities, Cities } from '@taskforce/shared-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileSchema {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'John Smith',
    minLength: 3,
    maxLength: 50,
    required: false,
  })
  public name?: string;

  @ApiProperty({
    description: 'Один из доступных городов',
    example: 'Москва',
    enum: Cities,
    required: false,
  })
  public city?: AvailableCities;

  @ApiProperty({
    description: 'День рождения пользователя',
    example: '1970-11-20',
    required: false,
  })
  public birthday?: Date;

  @ApiProperty({
    description: 'Информация о пользователе',
    example:
      'Соответствующих напрямую рамки модернизации обучения позиции обществом предпосылки принципов сомнений. Роль мира экономической кадров отношении рамки работы отношении формировании проблем. Прежде формирования общественной.',
    maxLength: 300,
    required: false,
  })
  public resume?: string;

  @ApiProperty({
    description: 'Специализация пользователя',
    example: '["строительство", "ремонт"]',
    type: 'string[]',
    maxItems: 5,
    required: false,
  })
  public specialty?: string[];
}
