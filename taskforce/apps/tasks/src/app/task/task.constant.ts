export const CREATE_TASK_VALIDATION_ERROR = {
  TITLE_REQUIRED: 'Заголовок задания - обязательное поле',
  TITLE_LENGTH_NOT_VALID:
    'Длина заголовка должна быть не менее 20 символов, и не более 50',
  DESCRIPTION_REQUIRED: 'Описание задания - обязательное поле',
  DESCRIPTION_LENGTH_NOT_VALID:
    'Длина описания должна быть не менее 100 символов, и не более 1024',
  CATEGORY_REQUIRED: 'Категория - обязательное поле',
  USER_ID_NOT_VALID: 'Неверный ID пользователя',
  PRICE_NOT_VALID: 'Неверное значение цены - допустимо 2 знака после запятой',
  PRICE_NEGATIVE: 'Цена не может быть отрицательным числом',
  EXECUTION_TERM_NOT_VALID: 'Неверный формат даты выполнения задания',
  EXECUTION_TERM_MIN_DATE_NOT_VALID:
    'Дата выполнения задания не может быть меньше текущей даты',
  ADDRESS_LENGTH_NOT_VALID:
    'Адрес доложен быть не менее 10 символов, и не более 255',
  TAGS_SIZE_NOT_VALID: 'Максимальное количество тегов - 5',
  TAG_LENGTH_NOT_VALID: 'Длина тегов должна быть не менее 3 символов, и не более 10',
  TAG_STARTS_WITH_NOT_VALID: 'Теги должны начинаться с буквы',
  STATUS_NOT_VALID: 'Неверный статус задания'
};
