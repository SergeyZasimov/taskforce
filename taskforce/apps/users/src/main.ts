/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

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
    .setDescription('The «Users» service API specification')
    .setVersion('1.0')
    .addTag('Users')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spec/users', app, document);

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || DEFAULT_SERVER_CONFIG.PORT;
  const host = process.env.HOST || DEFAULT_SERVER_CONFIG.HOST;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://${host}:${port}/${globalPrefix}`
  );
}

bootstrap();
