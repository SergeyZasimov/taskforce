import { ApiProperty } from '@nestjs/swagger';

export class AssignContractorSchema {
  @ApiProperty({
    description: 'ID задачи',
    example: '5',
    required: true,
  })
  public taskId: number;

  @ApiProperty({
    description: 'ID исполнителя',
    example: 'facbf9678dea73a5df67165c',
    required: true,
  })
  public contractorId: string;
}
