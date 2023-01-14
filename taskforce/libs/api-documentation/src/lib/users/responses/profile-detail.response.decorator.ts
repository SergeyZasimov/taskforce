import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UsersResponseDescription } from '../constant';
import { ProfileDetailSchema } from '../schemas';

export const ApiProfileDetailOk =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiResponse({
      status: HttpStatus.OK,
      description: UsersResponseDescription.ShowUser,
      type: ProfileDetailSchema,
    })(target, propertyKey, descriptor);
