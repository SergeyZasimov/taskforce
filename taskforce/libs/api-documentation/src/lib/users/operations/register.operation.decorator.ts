import { ApiOperation } from '@nestjs/swagger';
import { UsersApiOperationDescriptions } from '../constant';

export const ApiRegisterOperation =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiOperation({ description: UsersApiOperationDescriptions.Register })(
      target,
      propertyKey,
      descriptor
    );
