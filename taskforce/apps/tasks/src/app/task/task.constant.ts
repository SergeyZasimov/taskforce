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
};

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
};

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
};

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
};
