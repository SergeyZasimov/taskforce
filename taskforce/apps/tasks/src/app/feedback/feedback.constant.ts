export const CREATE_FEEDBACK_VALIDATION_ERROR = {
  USER_ID_NOT_VALID: 'Неверный ID пользователя',
  TASK_ID_NOT_VALID: 'Неверный ID задания',
  PRICE_NOT_VALID: 'Неверное значение цены - допустимо 2 знака после запятой',
  PRICE_NEGATIVE: 'Цена не может быть отрицательным числом',
  TEXT_LENGTH_NOT_VALID: 'Тест отзыва должен быть не более 150 символов',
} as const;

export const FEEDBACK_QUERY_VALIDATION_ERROR = {
  TASK_ID_REQUIRED: 'ID задачи - обязательное поле',
} as const;

export const FEEDBACK_EXCEPTION_MESSAGE = {
  TASK_NOT_FOUND: 'Задача не найдена',
  TASK_STATUS_NOT_VALID:
    'Отклик можно оставлять только к задаче со статусом "Новое"',
  FEEDBACK_EXIST: 'Отклик исполнителя уже существует',
} as const;
