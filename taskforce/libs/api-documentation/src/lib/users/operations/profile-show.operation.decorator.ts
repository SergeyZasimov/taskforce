import { ApiOperation } from '@nestjs/swagger';
import { ApiOperationDescriptions } from '../constant';

export const ApiProfileShowOperation =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiOperation({ description: ApiOperationDescriptions.Show })(
      target,
      propertyKey,
      descriptor
    );
