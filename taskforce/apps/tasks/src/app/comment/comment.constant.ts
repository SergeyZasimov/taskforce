export const CREATE_COMMENT_VALIDATION_ERROR = {
  TEXT_REQUIRED: 'Текст комментария - обязательное поле',
  TEXT_LENGTH_NOT_VALID:
    'Текст комментария должен быть не менее 10 символов, и не более 300',
  TASK_ID_NOT_VALID: 'Неверный ID задания',
  USER_ID_NO_VALID: 'Неверный ID пользователя',
} as const;

export const COMMENT_QUERY_VALIDATION_ERROR = {
  TASK_IS_REQUIRED: 'Номер задачи - обязательное поле',
} as const;

export const COMMENT_EXCEPTION_MESSAGE = {
  TASK_NOT_FOUND: 'Задача не найдена',
  COMMENT_NOT_FOUND: 'Комментарий не найден',
  FOREIGN_COMMENT: 'Нельзя удалять чужой комментарий',
} as const;

export const DEFAULT_COMMENT_LIST_SIZE = 50;
