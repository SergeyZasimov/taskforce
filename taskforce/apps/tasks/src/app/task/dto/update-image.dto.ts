import { Matches } from 'class-validator';
import { TASK_VALIDATION_ERROR } from '../task.constant';

export class UpdateImageDto {
  @Matches(/[\w/-]+.(jpg|png|jpeg)$/, {
    message: TASK_VALIDATION_ERROR.IMAGE_NOT_VALID,
  })
  public image: string;
}
