import { ApiBody } from '@nestjs/swagger';

export const ApiUploadAvatarBody =
  (fieldName: string): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) =>
    ApiBody({
      type: 'multipart/form-data',
      schema: {
        description: 'Путь до изображения',
        example: './avatar.jpg',
        type: 'object',
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
