import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TaskRdo {
  @Expose({ name: '_id' })
  @ApiProperty({
    description: 'Task ID',
    example: 'f0b8d9dd-015f-4c56-8d5c-5e45538dcd96',
  })
  public id: string;

  @Expose()
  @ApiProperty({
    description: 'Task title',
    example: 'Application development',
  })
  public title: string;

  @Expose()
  @ApiProperty({
    description: 'Task description',
    example: 'Create a mobile app',
  })
  public description: string;

  @Expose()
  @ApiProperty({
    description: 'Task category',
    example: 'Development',
  })
  public category: string;

  @Expose()
  @ApiProperty({
    description: 'Task price',
    example: '90',
  })
  public price: number;

  @Expose()
  @ApiProperty({
    description: 'Deadline for completing the task',
    example: '2022-11-23',
  })
  public executionTerm: string;

  @Expose()
  @ApiProperty({
    description: 'Task image',
    example: 'my-task-image.jpg',
  })
  public image: string;

  @Expose()
  @ApiProperty({
    description: 'Task completion address',
    example: 'Moscow, Leningradsky avenue 37',
  })
  public address: string;

  @Expose()
  @ApiProperty({
    description: 'Task tags',
    example: ['Development', 'IT'],
  })
  public tags: string[];

  @Expose()
  @ApiProperty({
    description: 'Task completion status',
    example: 'new',
  })
  public status: string;
}
