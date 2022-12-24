import { ClassConstructor, plainToInstance } from 'class-transformer';
import { SubscribeEvent } from '@taskforce/shared-types';

export function fillObject<T, V>(dto: ClassConstructor<T>, plainObject: V): T {
  return plainToInstance(dto, plainObject, { excludeExtraneousValues: true });
}

export function getMongoDbConnectionString({
  username,
  password,
  host,
  port,
  databaseName,
  authDatabase,
}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function createEvent(subscribeEvent: SubscribeEvent) {
  return { cmd: subscribeEvent };
}
