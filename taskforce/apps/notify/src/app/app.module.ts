import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import { getSmtpConfig, smtpOptions } from './config/smtp.config';
import { rabbitMqOptions } from './config/rabbitmq.config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongodbConfig, mongodbOptions } from './config/mongodb.config';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [smtpOptions, rabbitMqOptions, mongodbOptions],
    }),
    MailerModule.forRootAsync(getSmtpConfig()),
    MongooseModule.forRootAsync(getMongodbConfig()),
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
