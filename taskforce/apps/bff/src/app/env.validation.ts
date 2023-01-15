import { plainToInstance } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  Max,
  Min,
  validateSync,
} from 'class-validator';
import { EnvValidationMessage } from './app.constant';

const MIN_PORT = 0;
const MAX_PORT = 65535;

class EnvironmentsConfig {
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
    const messages = errors.map((error) => Object.values(error.constraints)[0]);
    throw new Error(messages.join(', '));
  }

  return environmentConfig;
}
