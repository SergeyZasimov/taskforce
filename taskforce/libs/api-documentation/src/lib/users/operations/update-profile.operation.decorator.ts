import { ApiOperation } from '@nestjs/swagger';
import { ApiOperationDescriptions } from '../constant';

export const ApiUpdateProfileOperation =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiOperation({ description: ApiOperationDescriptions.Update })(
      target,
      propertyKey,
      descriptor
    );
