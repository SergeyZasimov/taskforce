import { ApiOperation } from '@nestjs/swagger';
import { ApiOperationDescriptions } from '../constant';

export const ApiLoginOperation =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiOperation({ description: ApiOperationDescriptions.Login })(
      target,
      propertyKey,
      descriptor
    );
