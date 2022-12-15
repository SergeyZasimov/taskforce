import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment ID',
    example: '3',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Comment text',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'ID of the comment author',
    example: 'facbf9678dea73a5df67165c',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Date the comment was created',
    example: '2022-12-09T03:25:45.222Z',
  })
  @Expose()
  public createdAt: Date;
}
