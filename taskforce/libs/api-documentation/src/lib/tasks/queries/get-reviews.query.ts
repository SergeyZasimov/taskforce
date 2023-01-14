import { ApiProperty } from '@nestjs/swagger';

export class ApiReviewQuery {
  @ApiProperty({
    description: 'ID исполнителя',
    example: 'facbf9678dea73a5df67165c',
    required: true,
  })
  public contractorId: string;
}
