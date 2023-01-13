import { ApiBody } from '@nestjs/swagger';
import { LoginUserSchema } from '../schemas';

export const ApiLoginBody =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiBody({ type: LoginUserSchema })(target, propertyKey, descriptor);
