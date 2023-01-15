import { ApiOperation } from '@nestjs/swagger';
import { UsersApiOperationDescriptions } from '../constant';

export const ApiUpdateProfileOperation =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiOperation({ description: UsersApiOperationDescriptions.Update })(
      target,
      propertyKey,
      descriptor
    );
