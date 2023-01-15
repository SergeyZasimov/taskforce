export enum RouteDomain {
  UsersUrl = 'http://localhost:3332/api',
  TasksUrl = 'http://localhost:3333/api',
  NotifyUrl = 'http://localhost:3331/api',
}

export enum RouteModule {
  Auth = 'auth',
  Profile = 'profile',
  Tasks = 'tasks',
  Reviews = 'reviews',
  Comments = 'comments',
  Feedbacks = 'feedbacks',
  Notify = 'notify',
}

export enum Route {
  Register = 'register',
  Login = 'login',
  ChangePassword = 'change-password',
  GetRating = 'get-rating',
  TasksCounter = 'tasks-counter',
  ChangeStatus = 'change-status',
  AssignContractor = 'assign-contractor',
  MyTasks = 'my-tasks',
  GetNotify = 'notify',
  UploadAvatar = 'upload-avatar',
  MyProfile = 'my-profile',
  GetSubscriber = 'get-subscriber',
}
