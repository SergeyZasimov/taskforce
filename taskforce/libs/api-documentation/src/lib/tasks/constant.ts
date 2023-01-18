export enum TasksApiTag {
  Comment = 'Комментарии',
  Feedback = 'Отклики',
  Review = 'Отзывы',
  Task = 'Задачи',
}

export const COMMENT_API_OPERATION = {
  SHOW_ALL: 'Список сообщений для определенной задачи',
  CREATE: 'Создание комментария',
  DELETE: 'Удаление комментария',
} as const;

export const COMMENT_RESPONSE_DESCRIPTION = {
  SHOW_ALL_OK: 'Возвращает список комментариев для определенной задачи',
  CREATE_COMMENT: 'Успешное создание комментария',
  TASK_NOT_FOUND: 'Задача не найдена',
  BAD_REQUEST: 'Неверный запрос',
  UNAUTHORIZED: 'Пользователь не авторизован',
  DELETE_COMMENT: 'Успешное удаление комментария',
  COMMENT_NOT_FOUND: 'Комментарий не найден',
  FOREIGN_COMMENT: 'Комментарий другого пользователя',
} as const;

export const FEEDBACK_API_OPERATION = {
  SHOW_ALL: 'Список откликов для определенной задачи',
  CREATE: 'Создание отклика',
} as const;

export const FEEDBACK_RESPONSE_DESCRIPTION = {
  SHOW_ALL_OK: 'Возвращает список откликов для определенной задачи',
  CREATED: 'Успешное создание отклика',
  BAD_REQUEST: 'Неверные данные',
  TASK_NOT_FOUND: 'Задача не найдена',
  UNAUTHORIZED: 'Пользователь не авторизован',
  FORBIDDEN_ROLE: 'Неверная роль пользователя',
} as const;

export const REVIEW_API_OPERATION = {
  CREATE_REVIEW: 'Создание отзыва',
  CONTRACTOR_REVIEW: 'Список отзывов по исполнителю',
  GET_RATING: 'Получить рейтинг исполнителя',
} as const;

export const REVIEW_RESPONSE_DESCRIPTION = {
  CREATED: 'Успешное создание отзыва',
  SHOW_ALL: 'Возвращает список отзывов по исполнителю',
  RATING: 'Возвращает рейтинг исполнителя',
  BAD_REQUEST: 'Неверные данные',
  TASK_NOT_FOUND: 'Задача не найдена',
  UNAUTHORIZED: 'Пользователь не авторизован',
  CONFLICT: 'Отзыв уже существует',
  FORBIDDEN_ROLE: 'Неверная роль пользователя',
} as const;

export const TASK_API_OPERATIONS = {
  CHANGE_STATUS: 'Изменение статуса задания',
  ASSIGN_CONTRACTOR: 'Назначение исполнителя',
  MY_TASKS: 'Список задач пользователя в зависимости от роли',
  SHOW: 'Информация о задаче',
  SHOW_ALL: 'Список задач',
  CREATE: 'Создание задачи',
  UPDATE: 'Редактировать задание',
  DELETE: 'Удаление задания',
  NOTIFY: 'Рассылка уведомлений',
} as const;

export const TASK_RESPONSE_DESCRIPTION = {
  CREATED_OK: 'Успешное создание задачи',
  UPDATED_OK: 'Успешное изменение задачи',
  DELETED_OK: 'Успешное удаление задачи',
  NOTIFY_OK: 'Успешная отправка уведомлений',
  CHANGE_STATUS_OK: 'Успешное изменение статуса',
  ASSIGN_CONTRACTOR_OK: 'Успешное назначение исполнителя',
  SHOW_OK: 'Возвращает информацию о задаче',
  SHOW_ALL_OK: 'Возвращает список задач',
  MY_TASKS_OK: 'Список задач',
  BAD_REQUEST: 'Неверные данные',
  TASK_NOT_FOUND: 'Задача не найдена',
  UNAUTHORIZED: 'Пользователь не авторизован',
  FORBIDDEN_ROLE: 'Неверная роль пользователя',
} as const;
