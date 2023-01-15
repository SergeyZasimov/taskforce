import { ApiProperty } from '@nestjs/swagger';
import { ProfileSchema } from '../../users';

export class FeedbackSchema {
  @ApiProperty({
    description: 'ID отклика',
    example: '23',
  })
  public id: number;

  @ApiProperty({
    description: 'Текст отклика',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  public text: string;

  @ApiProperty({
    description: 'Предложенная стоимость выполнения',
    example: '360.99',
  })
  public price: number;

  @ApiProperty({
    description: 'Исполнитель',
    example: {
      id: '56b40ccec41bf44fa36b4cfa',
      name: 'Адриан Назаров',
      email: 'Aric.Kub@gmail.com',
      avatar: '',
      city: 'Москва',
      role: 'исполнитель',
      age: 29,
      specialty: ['pansy', 'surprise', 'pride'],
      register: '2023-01-05T02:47:08.416Z',
      resume:
        'Показывает обеспечивает отметить создание задания подготовке рамки определения настолько. Деятельности концепция деятельности модернизации. Важные повышение всего эксперимент.',
    },
    type: ProfileSchema,
  })
  public contractorId: ProfileSchema;

  @ApiProperty({
    description: 'Дата создания отклика',
    example: '2022-12-09T03:25:45.222Z',
  })
  public createdAt: Date;
}
