import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersResponseDescription } from '../constant';
import { LoggedUserSchema } from '../schemas';

export const ApiLoginOk =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiResponse({
      status: HttpStatus.OK,
      description: UsersResponseDescription.LoginUser,
      type: LoggedUserSchema,
    })(target, propertyKey, descriptor);
