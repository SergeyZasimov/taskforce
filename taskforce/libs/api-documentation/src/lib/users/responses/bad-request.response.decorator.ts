import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersResponseDescription } from '../constant';
import { UserBadRequestSchema } from '../schemas';

export const ApiUserBadRequest =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiResponse({
      status: HttpStatus.BAD_REQUEST,
      description: UsersResponseDescription.BadRequest,
      type: UserBadRequestSchema,
    })(target, propertyKey, descriptor);
