import { ClassConstructor, plainToClass } from 'class-transformer';

export function fillObject<T, V>(dto: ClassConstructor<T>, plainObject: V): T {
  return plainToClass(dto, plainObject, { excludeExtraneousValues: true });
}
