/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

const DEFAULT_SERVER_CONFIG = {
  HOST: 'localhost',
  PORT: 3333,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Taskforce')
    .setDescription('The «Taskforce» service API specification')
    .setVersion('1.0')
    .addTag('Taskforce')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec/taskforce', app, document);

  const host = process.env.HOST || DEFAULT_SERVER_CONFIG.HOST;
  const port = process.env.PORT || DEFAULT_SERVER_CONFIG.PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
  );
}

bootstrap();
