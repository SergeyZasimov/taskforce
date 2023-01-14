export enum TasksApiTag {
  Comment = 'Комментарии',
  Feedback = 'Отклики',
  Review = 'Отзывы',
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

export const REVIEW_EXCEPTION_MESSAGE = {
  TASK_NOT_FOUND: 'Задача не найдена',
  CONFLICT_REVIEW: 'Для этого задания уже есть отзыв',
  TASK_NOT_COMPLETE: 'Нельзя оставить отзыв. Задача не выполнена',
  FOREIGN_TASK: 'Нельзя оставить отзыв. Задача другого заказчика',
  FOREIGN_CONTRACTOR: 'Нельзя оставить отзыв. Исполнитель не выполнял задания',
};

export const REVIEW_API_OPERATION = {
  CREATE_REVIEW: 'Создание отзыва',
  CONTRACTOR_REVIEW: 'Список отзывов по исполнителю',
  GET_RATING: 'Получить рейтинг исполнителя',
};

export const REVIEW_RESPONSE_DESCRIPTION = {
  CREATED: 'Успешное создание отзыва',
  SHOW_ALL: 'Возвращает список отзывов по исполнителю',
  RATING: 'Возвращает рейтинг исполнителя',
  BAD_REQUEST: 'Неверные данные',
  TASK_NOT_FOUND: 'Задача не найдена',
  UNAUTHORIZED: 'Пользователь не авторизован',
  CONFLICT: 'Отзыв уже существует',
  FORBIDDEN_ROLE: 'Неверная роль пользователя',
};
