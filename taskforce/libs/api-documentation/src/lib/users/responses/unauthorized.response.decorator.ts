import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersResponseDescription } from '../constant';
import { UserUnauthorizedSchema } from '../schemas';

export const ApiUserUnauthorized =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiResponse({
      status: HttpStatus.UNAUTHORIZED,
      description: UsersResponseDescription.Unauthorized,
      type: UserUnauthorizedSchema,
    })(target, propertyKey, descriptor);
