import { TaskStatus, UserRole } from '@taskforce/shared-types';

export const TASK_VALIDATION_ERROR = {
  TITLE_REQUIRED: 'Заголовок задания - обязательное поле',
  TITLE_LENGTH_NOT_VALID:
    'Длина заголовка должна быть не менее 20 символов, и не более 50',
  DESCRIPTION_REQUIRED: 'Описание задания - обязательное поле',
  DESCRIPTION_LENGTH_NOT_VALID:
    'Длина описания должна быть не менее 100 символов, и не более 1024',
  CATEGORY_REQUIRED: 'Категория - обязательное поле',
  PRICE_NOT_VALID: 'Неверное значение цены - допустимо 2 знака после запятой',
  PRICE_NEGATIVE: 'Цена не может быть отрицательным числом',
  EXECUTION_TERM_NOT_VALID: 'Неверный формат даты выполнения задания',
  EXECUTION_TERM_MIN_DATE_NOT_VALID:
    'Дата выполнения задания не может быть меньше текущей даты',
  ADDRESS_LENGTH_NOT_VALID:
    'Адрес доложен быть не менее 10 символов, и не более 255',
  TAGS_SIZE_NOT_VALID: 'Максимальное количество тегов - 5',
  TAG_LENGTH_NOT_VALID:
    'Длина тегов должна быть не менее 3 символов, и не более 10',
  TAG_STARTS_WITH_NOT_VALID: 'Теги должны начинаться с буквы',
  STATUS_NOT_UPDATE: 'Нельзя устанавливать статус задания',
  CONTRACTOR_ID_NOT_VALID: 'ID исполнителя должно быть корректным',
  TASK_ID_NOT_VALID: 'ID задачи должно быть корректным',
  STATUS_NOT_VALID: 'Неверный статус задачи',
  IMAGE_NOT_VALID: 'Изображение должно быть в формате jpg или png',
  CITY_NOT_VALID: 'Неверный город',
  USER_ID_NOT_VALID: 'Неверный ID пользователя'
} as const;

export const RABBITMQ_SERVICE_NAME = 'TASKS_NOTIFY';

export const ALLOWED_STATUS_CHANGES = {
  [TaskStatus.New]: [TaskStatus.Cancel, TaskStatus.Process],
  [TaskStatus.Cancel]: [],
  [TaskStatus.Complete]: [],
  [TaskStatus.Process]: [TaskStatus.Complete, TaskStatus.Fail],
  [TaskStatus.Fail]: [],
};

export const ALLOWED_STATUS_CHANGES_BY_ROLE = {
  [UserRole.Customer]: [
    TaskStatus.Cancel,
    TaskStatus.Process,
    TaskStatus.Complete,
  ],
  [UserRole.Contractor]: [TaskStatus.Fail],
};

export const TASK_EXCEPTION_MESSAGE = {
  CHANGE_STATUS_NOT_VALID: 'Неверное изменение статуса',
  CHANGE_STATUS_ROLE_NOT_VALID:
    'Недопустимая роль пользователя для изменения статуса',
  TASK_NOT_FOUND: 'Задача не найдена',
  FOREIGN_TASK_UPDATE: 'Нельзя редактировать чужую задачу.',
  FOREIGN_TASK_DELETE: 'Нельзя удалять чужую задачу.',
  FEEDBACK_CONTRACTOR:
    'Назначать исполнителя можно только из списка откликнувшихся',
  PROCESS_CONTRACTOR:
    'Нельзя назначить исполнителя, у которого есть задача в работе',
} as const;
