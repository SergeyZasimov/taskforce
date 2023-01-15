import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { DB_ID_NOT_VALID } from './pipes.constant';

export class DbIdValidationPipe implements PipeTransform {
  transform(value: number, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe must user only with params!');
    }

    if (isNaN(Number(value))) {
      throw new BadRequestException(DB_ID_NOT_VALID);
    }

    return value;
  }
}
