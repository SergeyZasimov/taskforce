import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentSchema {
  @ApiProperty({
    description: 'Текст комментария',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    minLength: 10,
    maxLength: 300,
    required: true,
  })
  public text: string;

  @ApiProperty({
    description: 'ID задачи',
    example: '5',
    required: true,
  })
  public taskId: number;
}
