import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersResponseDescription } from '../constant';
import { ProfileSchema } from '../schemas';

export const ApiUpdateProfileOk =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiResponse({
      status: HttpStatus.OK,
      description: UsersResponseDescription.UpdateUser,
      type: ProfileSchema,
    })(target, propertyKey, descriptor);
