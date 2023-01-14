import { ApiProperty } from '@nestjs/swagger';

export class ApiCommentQuery {
  @ApiProperty({
    name: 'taskId',
    description: 'ID задачи для, которой запрашиваются комментарии ',
    type: 'number',
    example: '23',
  })
  public taskId: number;

  @ApiProperty({
    name: 'page',
    description: 'Номер страницы пагинации',
    type: 'number',
    example: '2',
    required: false,
  })
  public page?: number;
}
