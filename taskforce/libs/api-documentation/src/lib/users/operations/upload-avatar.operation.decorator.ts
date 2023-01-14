import { ApiOperation } from '@nestjs/swagger';
import { ApiOperationDescriptions } from '../constant';

export const ApiUploadAvatarOperation =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiOperation({ description: ApiOperationDescriptions.Upload })(
      target,
      propertyKey,
      descriptor
    );
