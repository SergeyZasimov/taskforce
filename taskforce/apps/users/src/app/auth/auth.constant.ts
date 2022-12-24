export const AUTH_USER_VALIDATION_ERRORS = {
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
};

export const RABBITMQ_SERVICE_NAME = 'RABBITMQ_SERVICE';
