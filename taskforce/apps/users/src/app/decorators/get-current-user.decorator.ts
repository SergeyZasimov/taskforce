import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (property: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (!property) {
      return request.user;
    }

    return request.user[property];
  }
);
