import { ApiOperation } from '@nestjs/swagger';
import { UsersApiOperationDescriptions } from '../constant';

export const ApiLoginOperation =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiOperation({ description: UsersApiOperationDescriptions.Login })(
      target,
      propertyKey,
      descriptor
    );
