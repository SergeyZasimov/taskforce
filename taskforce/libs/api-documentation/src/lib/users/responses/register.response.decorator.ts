import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersResponseDescription } from '../constant';
import { CreateUserResponseSchema } from '../schemas';

export const ApiRegisterOk =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiResponse({
      status: HttpStatus.CREATED,
      description: UsersResponseDescription.CreateUser,
      type: CreateUserResponseSchema,
    })(target, propertyKey, descriptor);
