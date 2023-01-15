import { ApiBody } from '@nestjs/swagger';
import { CreateUserSchema } from '../schemas';

export const ApiRegisterBody =
  (): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiBody({ type: CreateUserSchema })(target, propertyKey, descriptor);
