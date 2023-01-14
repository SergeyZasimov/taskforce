export const CREATE_FEEDBACK_VALIDATION_ERROR = {
  USER_ID_NOT_VALID: 'Неверный ID пользователя',
  TASK_ID_NOT_VALID: 'Неверный ID задания',
  PRICE_NOT_VALID: 'Неверное значение цены - допустимо 2 знака после запятой',
  PRICE_NEGATIVE: 'Цена не может быть отрицательным числом',
  TEXT_LENGTH_NOT_VALID: 'Тест отзыва должен быть не более 150 символов',
};

export const FEEDBACK_QUERY_VALIDATION_ERROR = {
  TASK_ID_REQUIRED: 'ID задачи - обязательное поле',
};

export const FEEDBACK_API_OPERATION = {
  SHOW_ALL: 'Список откликов для определенной задачи',
  CREATE: 'Создание отклика',
};

export const FEEDBACK_RESPONSE_DESCRIPTION = {
  SHOW_ALL_OK: 'Возвращает список откликов для определенной задачи',
  CREATED: 'Успешное создание отклика',
  BAD_REQUEST: 'Неверные данные',
  TASK_NOT_FOUND: 'Задача не найдена',
  UNAUTHORIZED: 'Пользователь не авторизован',
  FORBIDDEN_ROLE: 'Неверная роль пользователя',
};

export const FEEDBACK_EXCEPTION_MESSAGE = {
  TASK_NOT_FOUND: 'Задача не найдена',
  TASK_STATUS_NOT_VALID:
    'Отклик можно оставлять только к задаче со статусом "Новое"',
  FEEDBACK_EXIST: 'Отклик исполнителя уже существует',
};
