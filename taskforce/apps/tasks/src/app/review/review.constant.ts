export const REVIEW_VALIDATION_ERRORS = {
  CONTRACTOR_ID_NOT_VALID: 'ID исполнителя должно быть корректным',
  TASK_ID_NOT_VALID: 'ID задачи должно быть корректным',
  TEXT_REQUIRED: 'Текст - обязательное поле',
  TEXT_LENGTH_NOT_VALID:
    'Текст отзыва должен быть не менее 50 символов, и не более 500',
  RATING_REQUIRED: 'Оценка - обязательное поле',
  RATING_NOT_VALID: 'Оценка должно быть числом от 1 до 5',
} as const;

export const REVIEW_EXCEPTION_MESSAGE = {
  TASK_NOT_FOUND: 'Задача не найдена',
  CONFLICT_REVIEW: 'Для этого задания уже есть отзыв',
  TASK_NOT_COMPLETE: 'Нельзя оставить отзыв. Задача не выполнена',
  FOREIGN_TASK: 'Нельзя оставить отзыв. Задача другого заказчика',
  FOREIGN_CONTRACTOR: 'Нельзя оставить отзыв. Исполнитель не выполнял задания',
} as const;