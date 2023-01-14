import { ApiBody } from '@nestjs/swagger';
import { UpdateUserProfileSchema } from '../schemas';

export const ApiUpdateProfileBody =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiBody({ type: UpdateUserProfileSchema })(target, propertyKey, descriptor);
