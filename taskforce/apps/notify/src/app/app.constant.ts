export const ENV_FILE_PATH = 'environments/.notify.env';

export enum EnvValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
  RabbitUserRequired = 'RabbitMQ user name is required',
  RabbitPasswordRequired = 'RabbitMQ password is required',
  RabbitHostRequired = 'RabbitMQ host is required',
  RabbitNotifyQueueRequired = 'RabbitMQ queue name is required',
  DBPortNotValid = 'MongoDB post must be between 0 and 65535',
  PortNotValid = 'App post must be between 0 and 65535',
  SmtpHostRequired = 'SMTP host is required',
  SmtpPortRequired = 'SMTP port is required',
  MailFromRequired = 'Mail sender address is required'
}
