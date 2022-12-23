import { Module } from '@nestjs/common';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import { getSmtpConfig, smtpOptions } from './config/smtp.config';
import { rabbitMqOptions } from './config/rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [smtpOptions, rabbitMqOptions],
    }),
    MailerModule.forRootAsync(getSmtpConfig()),
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
