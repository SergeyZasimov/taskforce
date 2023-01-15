import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId } from 'class-validator';
import { TASK_VALIDATION_ERROR } from '../task.constant';

const { TASK_ID_NOT_VALID, CONTRACTOR_ID_NOT_VALID } = TASK_VALIDATION_ERROR;

export class AssignContractorDto {
  @ApiProperty({
    description: 'ID задачи',
    example: '5',
    required: true,
  })
  @IsInt({ message: TASK_ID_NOT_VALID })
  public taskId: number;

  @ApiProperty({
    description: 'ID исполнителя',
    example: 'facbf9678dea73a5df67165c',
    required: true,
  })
  @IsMongoId({ message: CONTRACTOR_ID_NOT_VALID })
  public contractorId: string;
}
