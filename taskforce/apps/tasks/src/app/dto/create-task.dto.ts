import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Application development',
  })
  public title: string;

  @ApiProperty({
    description: 'Task description',
    example: 'Create a mobile app',
  })
  public description: string;

  @ApiProperty({
    description: 'Task category',
    example: 'Development',
  })
  public category: string;

  @ApiProperty({
    description: 'Task price',
    example: '90',
    required: false,
  })
  public price?: number;

  @ApiProperty({
    description: 'Deadline for completing the task',
    example: '2022-11-23',
    required: false,
  })
  public executionTerm?: string;

  @ApiProperty({
    description: 'Task completion address',
    example: 'Moscow, Leningradsky avenue 37',
    required: false,
  })
  public address?: string;

  @ApiProperty({
    description: 'Task tags',
    example: ['Development', 'IT'],
    required: false,
  })
  public tags?: string[];
}
