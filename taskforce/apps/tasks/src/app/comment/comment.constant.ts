export const CREATE_COMMENT_VALIDATION_ERROR = {
  TEXT_REQUIRED: 'Текст комментария - обязательное поле',
  TEXT_LENGTH_NOT_VALID:
    'Текст комментария должен быть не менее 10 символов, и не более 300',
  TASK_ID_NOT_VALID: 'Неверный ID задания',
  USER_ID_NO_VALID: 'Неверный ID пользователя',
};

export const COMMENT_QUERY_VALIDATION_ERROR = {
  TASK_IS_REQUIRED: 'Номер задачи - обязательное поле',
};

export const COMMENT_EXCEPTION_MESSAGE = {
  TASK_NOT_FOUND: 'Задача не найдена',
  COMMENT_NOT_FOUND: 'Комментарий не найден',
  FOREIGN_COMMENT: 'Нельзя удалять чужой комментарий',
};

export const DEFAULT_COMMENT_LIST_SIZE = 50;

export const COMMENT_API_OPERATION = {
  SHOW_ALL: 'Список сообщений для определенной задачи',
  CREATE: 'Создание комментария',
  DELETE: 'Удаление комментария',
};

export const COMMENT_RESPONSE_DESCRIPTION = {
  SHOW_ALL_OK: 'Возвращает список комментариев для определенной задачи',
  CREATE_COMMENT: 'Успешное создание комментария',
  TASK_NOT_FOUND: 'Задача не найдена',
  BAD_REQUEST: 'Неверный запрос',
  UNAUTHORIZED: 'Пользователь не авторизован',
  DELETE_COMMENT: 'Успешное удаление комментария',
  COMMENT_NOT_FOUND: 'Комментарий не найден',
  FOREIGN_COMMENT: 'Комментарий другого пользователя',
};
