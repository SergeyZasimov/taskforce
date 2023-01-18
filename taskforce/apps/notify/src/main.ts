/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { getRabbitMqConfig } from './app/config/rabbitmq.config';

const DEFAULT_SERVER_CONFIG = {
  HOST: 'localhost',
  PORT: 3333,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  const configService = app.get<ConfigService>(ConfigService);
  app.connectMicroservice(getRabbitMqConfig(configService));

  await app.startAllMicroservices();

  const port = process.env.PORT || DEFAULT_SERVER_CONFIG.PORT;
  const host = process.env.HOST || DEFAULT_SERVER_CONFIG.HOST;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
  );

  Logger.log(`🚀 Notify service is running! `);
}

bootstrap();
