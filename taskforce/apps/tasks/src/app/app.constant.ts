export const ENV_FILE_PATH = 'environments/.tasks.env';

export enum EnvValidationMessage {
  JwtSecretRequired = 'JWT secret is required',
  RabbitUserRequired = 'RabbitMQ user name is required',
  RabbitPasswordRequired = 'RabbitMQ password is required',
  RabbitHostRequired = 'RabbitMQ host is required',
  RabbitNotifyQueueRequired = 'RabbitMQ queue name is required',
  UploadDestRequired = 'Upload directory is required',
  DBPortNotValid = 'MongoDB post must be between 0 and 65535',
  PortNotValid = 'App post must be between 0 and 65535',
}
