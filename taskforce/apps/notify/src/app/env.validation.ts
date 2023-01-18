import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { EnvValidationMessage } from './app.constant';

const VALID_PORT = {
  MIN: 0,
  MAX: 65535,
} as const;

class EnvironmentsConfig {
  @IsString({ message: EnvValidationMessage.DBNameRequired })
  public MONGO_DB: string;

  @IsString({ message: EnvValidationMessage.DBHostRequired })
  public MONGO_HOST: string;

  @IsInt({ message: EnvValidationMessage.DBPortRequired })
  @Min(VALID_PORT.MIN, { message: EnvValidationMessage.DBPortNotValid })
  @Max(VALID_PORT.MAX, { message: EnvValidationMessage.DBPortNotValid })
  public MONGO_PORT: number;

  @IsString({ message: EnvValidationMessage.DBUserRequired })
  public MONGO_USER: string;

  @IsString({ message: EnvValidationMessage.DBPasswordRequired })
  public MONGO_PASSWORD: string;

  @IsString({ message: EnvValidationMessage.DBBaseAuthRequired })
  public MONGO_AUTH_BASE: string;

  @IsString({ message: EnvValidationMessage.RabbitUserRequired })
  public RABBIT_USER: string;

  @IsString({ message: EnvValidationMessage.RabbitPasswordRequired })
  public RABBIT_PASSWORD: string;

  @IsString({ message: EnvValidationMessage.RabbitHostRequired })
  public RABBIT_HOST: string;

  @IsString({ message: EnvValidationMessage.RabbitNotifyQueueRequired })
  public RABBIT_NOTIFY_QUEUE: string;

  @IsString({ message: EnvValidationMessage.SmtpHostRequired })
  public SMTP_HOST: string;

  @Min(VALID_PORT.MIN, { message: EnvValidationMessage.PortNotValid })
  @Max(VALID_PORT.MAX, { message: EnvValidationMessage.PortNotValid })
  @IsInt({ message: EnvValidationMessage.SmtpPortRequired })
  public SMTP_PORT: number;

  @IsString({ message: EnvValidationMessage.MailFromRequired })
  public MAIL_FROM: string;

  @IsOptional()
  public HOST: string;

  @Min(VALID_PORT.MIN, { message: EnvValidationMessage.PortNotValid })
  @Max(VALID_PORT.MAX, { message: EnvValidationMessage.PortNotValid })
  @IsInt()
  @IsOptional()
  public PORT: number;
}

export function validateEnvironments(config: Record<string, unknown>) {
  const environmentConfig = plainToInstance(EnvironmentsConfig, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(environmentConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    const messages = errors.map((error) => Object.values(error.constraints)[0]);
    throw new Error(messages.join(', '));
  }

  return environmentConfig;
}
