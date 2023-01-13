import { MailerOptions } from '@nestjs-modules/mailer';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigService, registerAs } from '@nestjs/config';
import * as path from 'path';

export const smtpOptions = registerAs('smtp', () => ({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  from: process.env.MAIL_FROM,
}));

export function getSmtpConfig(): MailerAsyncOptions {
  return {
    useFactory: async (
      configService: ConfigService
    ): Promise<MailerOptions> => ({
      transport: {
        host: configService.get<string>('smtp.host'),
        port: configService.get<number>('smtp.port'),
        secure: false,
      },
      defaults: {
        from: configService.get<string>('smtp.from'),
      },
      template: {
        dir: path.resolve(__dirname, 'assets'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    inject: [ConfigService],
  };
}
