export enum TasksApiTag {
  Comment = 'Комментарии',
}

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

export const COMMENT_EXCEPTION_MESSAGE = {
  TASK_NOT_FOUND: 'Задача не найдена',
  COMMENT_NOT_FOUND: 'Комментарий не найден',
  FOREIGN_COMMENT: 'Нельзя удалять чужой комментарий',
};
