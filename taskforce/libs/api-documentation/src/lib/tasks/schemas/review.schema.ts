import { ApiProperty } from '@nestjs/swagger';
import { ProfileSchema } from '../../users';

export class ReviewSchema {
  @ApiProperty({
    description: 'ID отзыва',
    example: '5',
  })
  public id: number;

  @ApiProperty({
    description: 'заказчик',
    example: {
      id: '56b40ccec41bf44fa36b4cfa',
      name: 'Адриан Назаров',
      email: 'Aric.Kub@gmail.com',
      avatar: '',
      city: 'Москва',
      role: 'заказчик',
      age: 29,
      register: '2023-01-05T02:47:08.416Z',
      resume:
        'Показывает обеспечивает отметить создание задания подготовке рамки определения настолько. Деятельности концепция деятельности модернизации. Важные повышение всего эксперимент.',
    },
    type: ProfileSchema,
  })
  public customerId: number;

  @ApiProperty({
    description: 'ID задачи',
    example: '5',
  })
  public taskId: string;

  @ApiProperty({
    description: 'Текст отклика',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  public text: string;

  @ApiProperty({
    description: 'Оценка исполнителя',
    example: '5',
  })
  public rating: number;
}
