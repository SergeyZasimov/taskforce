import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersResponseDescription } from '../constant';
import { ConflictSchema } from '../schemas';

export const ApiUserConflict =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiResponse({
      status: HttpStatus.CONFLICT,
      description: UsersResponseDescription.Conflict,
      type: ConflictSchema,
    })(target, propertyKey, descriptor);
