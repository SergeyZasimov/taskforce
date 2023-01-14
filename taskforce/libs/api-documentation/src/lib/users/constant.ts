export enum ApiTag {
  Auth = 'Авторизация',
  Profile = 'Профиль',
}

export enum UsersResponseDescription {
  CreateUser = 'Успешная регистрация пользователя',
  LoginUser = 'Успешная авторизация пользователя',
  UpdateUser = 'Успешное изменение данных пользователя',
  BadRequest = 'Неверные данные в запросе',
  Conflict = 'Пользователь уже зарегистрирован',
  NotFound = 'Пользователь не найден',
  PasswordError = 'Неверный пароль',
  Unauthorized = 'Пользователь не авторизован',
  PasswordChange = 'Успешная смена пароля',
  UploadAvatar = 'Успешная загрузка аватара',
  ShowUser = 'Информация о пользователе',
}

export enum ApiOperationDescriptions {
  Register = 'Регистрация пользователя',
  Login = 'Авторизация пользователя',
  PasswordChange = 'Смена пароля',
  Upload = 'Загрузка аватара',
  Update = 'Изменение профиля пользователя',
  Show = 'Информация о пользователе',
}
