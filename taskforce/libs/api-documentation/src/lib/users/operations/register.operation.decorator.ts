import { ApiOperation } from '@nestjs/swagger';
import { ApiOperationDescriptions } from '../constant';

export const ApiRegisterOperation =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiOperation({ description: ApiOperationDescriptions.Register })(
      target,
      propertyKey,
      descriptor
    );
