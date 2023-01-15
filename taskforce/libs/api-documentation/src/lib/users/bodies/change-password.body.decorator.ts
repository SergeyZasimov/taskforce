import { ApiBody } from '@nestjs/swagger';
import { ChangePasswordSchema } from '../schemas';

export const ApiChangePasswordBody =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiBody({ type: ChangePasswordSchema })(target, propertyKey, descriptor);
