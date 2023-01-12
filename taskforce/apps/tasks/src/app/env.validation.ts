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

const MIN_PORT = 0;
const MAX_PORT = 65535;

class EnvironmentsConfig {
  @IsString({ message: EnvValidationMessage.JwtSecretRequired })
  public JWT_SECRET: string;

  @IsString({ message: EnvValidationMessage.RabbitUserRequired })
  public RABBIT_USER: string;

  @IsString({ message: EnvValidationMessage.RabbitPasswordRequired })
  public RABBIT_PASSWORD: string;

  @IsString({ message: EnvValidationMessage.RabbitHostRequired })
  public RABBIT_HOST: string;

  @IsString({ message: EnvValidationMessage.RabbitNotifyQueueRequired })
  public RABBIT_NOTIFY_QUEUE: string;

  @IsString({ message: EnvValidationMessage.UploadDestRequired })
  public UPLOAD_DEST: string;

  @IsOptional()
  public HOST: string;

  @Min(MIN_PORT, { message: EnvValidationMessage.PortNotValid })
  @Max(MAX_PORT, { message: EnvValidationMessage.PortNotValid })
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
    console.log(errors.map((error) => error.constraints));
  }

  return environmentConfig;
}
