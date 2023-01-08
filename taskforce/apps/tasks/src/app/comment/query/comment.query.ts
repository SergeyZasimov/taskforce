import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CommentQuery {
  @ApiProperty({
    name: 'taskId',
    description: 'ID of the task to which the comments',
    type: 'number',
    example: '23',
  })
  @IsInt()
  @Transform(({ value }) => +value)
  public taskId: number;

  @IsInt()
  @Transform(({ value }) => +value)
  @IsOptional()
  public page?: number;
}
