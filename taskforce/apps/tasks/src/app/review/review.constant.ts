export const REVIEW_VALIDATION_ERRORS = {
  CONTRACTOR_ID_NOT_VALID: 'ID исполнителя должно быть корректным',
  TASK_ID_NOT_VALID: 'ID задачи должно быть корректным',
  TEXT_REQUIRED: 'Текст - обязательное поле',
  TEXT_LENGTH_NOT_VALID:
    'Текст отзыва должен быть не менее 50 символов, и не более 500',
  RATING_REQUIRED: 'Оценка - обязательное поле',
  RATING_NOT_VALID: 'Оценка должно быть числом от 1 до 5',
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
};
