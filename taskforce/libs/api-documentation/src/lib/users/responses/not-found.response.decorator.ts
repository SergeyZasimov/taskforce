import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersResponseDescription } from '../constant';
import { NotFoundSchema } from '../schemas';

export const ApiUserNotFound =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiResponse({
      status: HttpStatus.NOT_FOUND,
      description: UsersResponseDescription.NotFound,
      type: NotFoundSchema,
    })(target, propertyKey, descriptor);
