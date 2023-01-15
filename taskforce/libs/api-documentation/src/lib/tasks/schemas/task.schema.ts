import { ApiProperty } from '@nestjs/swagger';
import { ProfileSchema } from '../../users';

export class TaskSchema {
  @ApiProperty({
    description: 'ID задачи',
    example: '3',
  })
  public id: number;

  @ApiProperty({
    description: 'Заголовок задачи',
    example: 'Lorem ipsum dolor si amet.',
  })
  public title: string;

  @ApiProperty({
    description: 'Детальное описание задачи',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  public description: string;

  @ApiProperty({
    description: 'Категория',
    example: 'Works',
  })
  public category: string;

  @ApiProperty({
    description: 'Заказчик',
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
  public customerId: ProfileSchema;

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
    description: 'Стоимость выполнения',
    example: '350.50',
  })
  public price: number;

  @ApiProperty({
    description: 'Срок исполнения',
    example: '2022-12-22',
  })
  public executionTerm: Date;

  @ApiProperty({
    description: 'Изображение',
    example: 'http://localhost:3333/upload/image.jpg',
  })
  public image: string;

  @ApiProperty({
    description: 'Адрес задачи',
    example: 'Москва Ленинградское ш., 23',
  })
  public address: string;

  @ApiProperty({
    description: 'Теги',
    example: ['new', 'tag'],
    type: 'array',
    items: {
      type: 'string',
      description: 'Task tag starting with a letter',
      example: 'tag',
    },
  })
  public tags: string[];

  @ApiProperty({
    description: 'Статус задачи',
    example: 'new',
  })
  public status: string;

  @ApiProperty({
    description: 'Дата создания',
    example: '2022-12-09T03:25:45.222Z',
  })
  public createdAt: Date;

  @ApiProperty({
    description: 'Количество комментариев',
    example: '8',
  })
  public commentsCount: number;

  @ApiProperty({
    description: 'Количество откликов',
    example: '8',
  })
  public feedbacksCount: number;
}
