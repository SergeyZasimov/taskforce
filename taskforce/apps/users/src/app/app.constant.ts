export const ENV_FILE_PATH = 'environments/.users.env';

export enum EnvValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
  JwtSecretRequired = 'JWT secret is required',
  RabbitUserRequired = 'RabbitMQ user name is required',
  RabbitPasswordRequired = 'RabbitMQ password is required',
  RabbitHostRequired = 'RabbitMQ host is required',
  RabbitNotifyQueueRequired = 'RabbitMQ queue name is required',
  UploadDestRequired = 'Upload directory is required',
  DBPortNotValid = 'MongoDB post must be between 0 and 65535',
  PortNotValid = 'App post must be between 0 and 65535',
}

export const USER_VALIDATION_ERRORS = {
  NAME_REQUIRED: 'Имя пользователя - обязательное поле',
  NAME_LENGTH_NOT_VALID:
    'Имя пользователя должно быть не менее 3 символов, и не более 50',
  EMAIL_REQUIRED: 'E-mail - обязательное поле',
  PASSWORD_REQUIRED: 'Пароль - обязательное поле',
  PASSWORD_LENGTH_NOT_VALID:
    'Пароль должен быть не менее 6 символов, и не более 12',
  CITY_NOT_VALID:
    'Возможен только один город из списка: Москва, Санкт-Петербург, Владивосток',
  BIRTHDAY_NOT_VALID: 'Неверный формат даты',
  ROLE_REQUIRED: 'Выберете роль - Заказчик или Исполнитель',
  RESUME_LENGTH_NOT_VALID:
    'Информация о себе должна быть не более 300 символов',
  SPECIALTY_LENGTH_NOT_VALID: 'Допустимо не более 5 вариантов специализации',
  EMAIL_NOT_UPDATE: 'Почтовый адрес нельзя изменить',
  ROLE_NOT_UPDATE: 'Роль нельзя изменить',
  TEENAGE_CONSTRAINT: 'Возраст должен быть больше 18 лет',
  AVATAR_ERROR: 'Изображение должно быть в формате .jpg или .png',
};

export const RABBITMQ_SERVICE_NAME = 'RABBITMQ_SERVICE';

export const SALT_ROUNDS = 10;
export const MEMORY_REPOSITORY_MAX_USERS = 100;
export const DEFAULT_PASSWORD_HASH = '';

export const USER_NOT_FOUND = 'Пользователь не найден';
export const EXIST_USER_ERROR = 'Пользователь уже зарегистрирован';
export const WRONG_PASSWORD_ERROR = 'Неверный пароль';
export const BAD_REQUEST_ERROR = 'Неверный запрос';

export enum ResponseDescription {
  CreateUser = 'Успешная регистрация пользователя',
  LoginUser = 'Успешная авторизация пользователя',
  BadRequest = 'Неверные данные в запросе',
  Conflict = 'Пользователь уже зарегистрирован',
  NotFound = 'Пользователь не найден',
  Unauthorized = 'Пользователь не авторизован',
  PasswordChange = 'Успешная смена пароля',
  UploadAvatar = 'Успешная загрузка аватара',
  ShowUser = 'Информация о пользователе',
}

export enum ApiOperationDescriptions {
  Register = 'Регистрация пользователя',
  Login = 'Авторизация пользователя',
  PasswordChange = 'Смена пароля',
  Upload = 'Загрузка аватара',
  Update = 'Изменение профиля пользователя',
  Show = 'Информация о пользователе',
}
