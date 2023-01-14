export enum RouteDomain {
  UsersUrl = 'http://localhost:3332/api',
  TasksUrl = 'http://localhost:3333/api',
}

export enum RouteModule {
  Auth = 'auth',
  Profile = 'profile',
  Tasks = 'tasks',
  Reviews = 'reviews',
}

export enum Route {
  Register = 'register',
  Login = 'login',
  ChangePassword = 'change-password',
  UploadAvatar = 'upload-avatar',
  GetRating = 'get-rating',
  TasksCounter = 'tasks-counter',
}
