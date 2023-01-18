import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { DB_ID_NOT_VALID, ONLY_PARAM_PIPE_ERROR } from './pipes.constant';

export class DbIdValidationPipe implements PipeTransform {
  transform(value: number, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error(ONLY_PARAM_PIPE_ERROR);
    }

    if (isNaN(Number(value))) {
      throw new BadRequestException(DB_ID_NOT_VALID);
    }

    return value;
  }
}
