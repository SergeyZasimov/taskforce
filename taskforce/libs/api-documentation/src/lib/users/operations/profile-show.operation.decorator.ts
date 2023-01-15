import { ApiOperation } from '@nestjs/swagger';
import { UsersApiOperationDescriptions } from '../constant';

export const ApiProfileShowOperation =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiOperation({ description: UsersApiOperationDescriptions.Show })(
      target,
      propertyKey,
      descriptor
    );
