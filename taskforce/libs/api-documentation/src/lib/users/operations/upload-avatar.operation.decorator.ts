import { ApiOperation } from '@nestjs/swagger';
import { UsersApiOperationDescriptions } from '../constant';

export const ApiUploadAvatarOperation =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiOperation({ description: UsersApiOperationDescriptions.Upload })(
      target,
      propertyKey,
      descriptor
    );
