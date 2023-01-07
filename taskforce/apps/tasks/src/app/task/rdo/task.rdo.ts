import { ApiProperty } from '@nestjs/swagger';
import { Category, Tag, TaskStatus } from '@taskforce/shared-types';
import { Expose } from 'class-transformer';

export class TaskRdo {
  @ApiProperty({
    description: 'Task ID',
    example: '3',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Task title',
    example: 'Lorem ipsum dolor si amet.',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Works',
  })
  @Expose()
  public category: string;

  @ApiProperty({
    description: 'User ID of the task creator',
    example: 'facbf9678dea73a5df67165c',
  })
  @Expose()
  public customerId: string;

  @ApiProperty({
    description: 'User ID of the task executor',
    example: 'facbf9678dea73a5df67165c',
  })
  @Expose()
  public contractorId: string;

  @ApiProperty({
    description: 'Task completion price',
    example: '350.50',
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'The deadline for completion the task',
    example: '2022-12-22',
  })
  @Expose()
  public executionTerm: Date;

  @Expose() public image: string;

  @ApiProperty({
    description: 'Task address',
    example: 'Москва Ленинградское ш., 23',
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Task tags',
    example: ['new', 'tag'],
    type: 'array',
    items: {
      type: 'string',
      description: 'Task tag starting with a letter',
      example: 'tag',
    },
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Task status',
    example: 'new',
  })
  @Expose()
  public status: TaskStatus;

  @ApiProperty({
    description: 'Date the task was created',
    example: '2022-12-09T03:25:45.222Z',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Date the task was updated',
    example: '2022-12-09T03:25:45.222Z',
  })
  @Expose()
  public updatedAt: Date;

  @ApiProperty({
    description: 'Count of comments',
    example: '8',
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Count of feedbacks',
    example: '8',
  })
  @Expose()
  public feedbacksCount: number;
}
