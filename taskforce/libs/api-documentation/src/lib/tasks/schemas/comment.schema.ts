import { ApiProperty } from '@nestjs/swagger';
import { ProfileSchema } from '../../users';

export class CommentSchema {
  @ApiProperty({
    description: 'ID комментария',
    example: '3',
  })
  public id: number;

  @ApiProperty({
    description: 'Текст комментария',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  public text: string;

  @ApiProperty({
    description: 'Автор комментария',
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
  public userId: ProfileSchema;

  @ApiProperty({
    description: 'Дата создания комментария',
    example: '2022-12-09T03:25:45.222Z',
  })
  public createdAt: Date;
}
