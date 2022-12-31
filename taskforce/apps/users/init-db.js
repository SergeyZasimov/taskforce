db = db.getSiblingDB(process.env['MONGO_INITDB_DATABASE']);
db.createCollection('users');

db.users.insertMany([
  {
    name: 'Борислав Муравьев',
    email: 'Domingo_Zieme53@mail.ru',
    role: 'заказчик',
    passwordHash:
      '$2b$10$peYJAE0YC1EWZkQkj9tlqO1DzOPbfJi0qgZS8dit6E68IU5UbVTLC',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/58.jpg',
    birthday: '1947-10-23T22:54:30.952Z',
    city: 'Москва',
    createdAt: '2022-12-12T06:42:40.948Z',
    updatedAt: '2022-12-27T16:12:43.836Z',
  },
  {
    name: 'Милен Кабанов',
    email: 'Nicklaus.Adams@gmail.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$XT/7F5WWyrcFEmt.g9oyNOh5CML2s0LOgR6/0UIZgwlQmVUoEQFpO',
    avatar: '',
    birthday: '1990-06-20T12:59:04.453Z',
    city: 'Владивосток',
    createdAt: '2022-12-05T02:31:50.107Z',
    updatedAt: '2022-12-29T21:38:36.100Z',
  },
  {
    name: 'Георгий Вишняков',
    email: 'Fanny.Walsh@yahoo.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$bNQ0KCfTuEjrGKX/lvQ6m.eQXb.W.kaejkKq79HibekzlKpSlANLe',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/771.jpg',
    birthday: '1947-05-23T15:11:13.202Z',
    city: 'Москва',
    createdAt: '2022-12-08T07:39:01.434Z',
    updatedAt: '2022-12-26T18:32:48.135Z',
  },
  {
    name: 'Фока Сидоров',
    email: 'Elenora_Russel10@gmail.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$s96IOho/mR9EfJ8aE.sp0.0b9e5h/EOMVseLyLEc9FCmcAWQW/6PW',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/32.jpg',
    birthday: '1955-06-24T00:05:44.924Z',
    city: 'Владивосток',
    createdAt: '2022-12-07T16:29:53.884Z',
    updatedAt: '2022-12-30T02:34:19.674Z',
  },
  {
    name: 'Глеб Веселов',
    email: 'Domenic58@mail.ru',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$R8SIAdyQ3uqdCQcVzhRw/uGl5W52ZCjBYvRMMClaSQ/JbjTB2focu',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/542.jpg',
    birthday: '1995-07-13T04:14:40.403Z',
    city: 'Санкт-Петербург',
    createdAt: '2022-12-12T07:41:52.202Z',
    updatedAt: '2022-12-27T09:27:43.065Z',
  },
  {
    name: 'Никифор Марков',
    email: 'Tremayne.Wunsch22@gmail.com',
    role: 'заказчик',
    passwordHash:
      '$2b$10$oY4rJcurHdPvAegQ7KegaOXJ7xytt5hJ3U0BIZtJz6HrYAhg/CmXu',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/880.jpg',
    birthday: '1965-05-24T14:30:31.349Z',
    city: 'Москва',
    createdAt: '2022-12-12T15:55:39.856Z',
    updatedAt: '2022-12-25T23:10:59.969Z',
  },
  {
    name: 'Егор Ефремов',
    email: 'Bart_Nitzsche@yahoo.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$S0cz09EooDN8Jt0shg4tVuTRtEf6tiNEdssKap9O.HX9dbwcGTn8i',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/32.jpg',
    birthday: '1961-02-17T06:04:37.563Z',
    city: 'Москва',
    createdAt: '2022-12-27T06:46:53.181Z',
    updatedAt: '2022-12-25T16:12:40.124Z',
  },
  {
    name: 'Чеслав Лобанов',
    email: 'Hermina1@ya.ru',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$hOmQhB6KGU1fWrVqJ0IxVe1pAPLNH9YoWRXLthDxFY/5HJKPoX4ha',
    avatar: '',
    birthday: '1953-08-03T14:00:24.619Z',
    city: 'Москва',
    createdAt: '2022-12-27T03:25:20.167Z',
    updatedAt: '2022-12-27T09:13:00.100Z',
  },
  {
    name: 'Емельян Воробьев',
    email: 'Dax_Murphy51@hotmail.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$tltRbLFkrn5JcXQhgucTYelHsvwrOG4RI/Y35nNk04l6Sq2NyU3.e',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/57.jpg',
    birthday: '1945-07-09T07:01:32.900Z',
    city: 'Санкт-Петербург',
    createdAt: '2022-12-18T01:32:17.770Z',
    updatedAt: '2022-12-28T17:25:09.729Z',
  },
  {
    name: 'Святослав Мясников',
    email: 'Madie36@hotmail.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$3s4EDF2xhRgF1BHsTYydiuRdoCoR3Kzw3bw8Pc7wh.G3iyPmSUlmO',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/547.jpg',
    birthday: '2002-03-21T04:30:01.572Z',
    city: 'Владивосток',
    createdAt: '2022-12-01T20:31:46.867Z',
    updatedAt: '2022-12-28T21:13:08.582Z',
  },
]);
