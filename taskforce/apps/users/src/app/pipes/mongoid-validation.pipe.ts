import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { BAD_MONGOID_ERROR } from './pipes.constant';

export class MongoidValidationPipe implements PipeTransform {
  transform(value: string, { type }: ArgumentMetadata) {
    if (type !== 'param') {
      throw new Error('This pipe must user only with params!');
    }

    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException(BAD_MONGOID_ERROR);
    }

    return value;
  }
}
