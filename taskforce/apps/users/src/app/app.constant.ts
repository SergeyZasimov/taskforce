export const ENV_FILE_PATH = 'environments/.users.env';

export enum EnvValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
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
    'Возможен только один город изи списка: Москва, Санкт-Петербург, Владивосток',
  BIRTHDAY_NOT_VALID: 'Неверный формат даты',
  ROLE_REQUIRED: 'Выберете роль - Заказчик или Исполнитель',
  RESUME_LENGTH_NOT_VALID:
    'Информация о себе должна быть не более 300 символов',
  SPECIALTY_LENGTH_NOT_VALID: 'Допустимо не более 5 вариантов специализации',
  EMAIL_NOT_UPDATE: 'Почтовый адрес нельзя изменить',
  ROLE_NOT_UPDATE: 'Роль нельзя изменить',
};

export const RABBITMQ_SERVICE_NAME = 'RABBITMQ_SERVICE';

export const REVIEW_VALIDATION_ERRORS = {
  AUTHOR_ID_NOT_VALID: 'ID автора должно быть корректным',
  CONTRACTOR_ID_NOT_VALID: 'ID исполнителя должно быть корректным',

  TASK_ID_NOT_VALID: 'ID задачи должно быть корректным',
  TEXT_REQUIRED: 'Текст - обязательное поле',
  TEXT_LENGTH_NOT_VALID:
    'Текст отзыва должен быть не менее 50 символов, и не более 500',
  RATING_REQUIRED: 'Оценка - обязательное поле',
  RATING_NOT_VALID: 'Оценка должно быть числом от 1 до 5',
};

export const SALT_ROUNDS = 10;
export const MEMORY_REPOSITORY_MAX_USERS = 100;
export const DEFAULT_PASSWORD_HASH = '';
