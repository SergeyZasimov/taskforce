import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersResponseDescription } from '../constant';
import { PasswordErrorSchema } from '../schemas';

export const ApiPasswordError =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiResponse({
      status: HttpStatus.FORBIDDEN,
      description: UsersResponseDescription.PasswordError,
      type: PasswordErrorSchema,
    })(target, propertyKey, descriptor);
