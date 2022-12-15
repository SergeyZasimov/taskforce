import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FeedbackRdo {
  @ApiProperty({
    description: 'Feedback ID',
    example: '23',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Feedback text',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Execution price',
    example: '360.99',
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'ID of the feedback author',
    example: 'facbf9678dea73a5df67165c',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Date the feedback was created',
    example: '2022-12-09T03:25:45.222Z',
  })
  @Expose()
  public createdAt: Date;
}
