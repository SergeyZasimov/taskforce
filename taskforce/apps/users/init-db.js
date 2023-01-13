db = db.getSiblingDB(process.env['MONGO_INITDB_DATABASE']);
db.createCollection('users');

db.users.insertMany([
  {
    _id: ObjectId('bf5efe7ad6a73ddace20394b'),
    name: 'Савватий Нестеров',
    email: 'Cecile.Collins27@gmail.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$0OALx1NGY1TyDP8hRN4RtOm8HeRL5pyQOiPRryju1lKpk1hnMrH6G',
    avatar: '',
    birthday: '1946-04-04T03:38:15.056Z',
    city: 'Владивосток',
    createdAt: '2022-12-25T04:20:38.442Z',
    updatedAt: '2023-01-11T05:24:15.046Z',
    specialty: ['proof', 'deathwatch'],
  },
  {
    _id: ObjectId('ba2d1230a22d98fabe91cee7'),
    name: 'Руслан Шарапов',
    email: 'Keith55@yahoo.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$hcQBhwEcegrhE0kv4f5Enet4rBR5nvgZr1orzPHntwsXAQLswmbHq',
    avatar: '',
    birthday: '1974-01-28T17:22:14.916Z',
    city: 'Москва',
    createdAt: '2022-12-28T01:37:15.675Z',
    updatedAt: '2023-01-11T16:15:27.330Z',
    specialty: ['meridian', 'vacation'],
  },
  {
    _id: ObjectId('f0aaacafa86eeeb7eddf6e38'),
    name: 'Артем Евдокимов',
    email: 'Micheal_Hegmann35@hotmail.com',
    role: 'заказчик',
    passwordHash:
      '$2b$10$sy3VAP4jiHu2zAd32m3OreS5SLLXthV//.CR7BKWScYXds.A8YVLO',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/572.jpg',
    birthday: '1962-08-02T02:48:23.191Z',
    city: 'Санкт-Петербург',
    createdAt: '2023-01-04T00:11:30.449Z',
    updatedAt: '2023-01-10T20:50:39.918Z',
  },
  {
    _id: ObjectId('717e4c4ed58a3cad88fd2d4e'),
    name: 'Ираклий Кулаков',
    email: 'Aryanna45@gmail.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$rQO2ZMWF6u3BTUxlo6yIUeCDVw1cvaz965.OhrOxLbw8arCS8k8wS',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/970.jpg',
    birthday: '1999-03-19T19:29:49.994Z',
    city: 'Санкт-Петербург',
    createdAt: '2022-12-30T22:24:06.565Z',
    updatedAt: '2023-01-09T01:42:17.580Z',
    resume:
      'Важную собой соображения обеспечение новая. Плановых изменений принимаемых важные. Ресурсосберегающих современного сущности не существующий обществом принимаемых.',
    specialty: [],
  },
  {
    _id: ObjectId('52e59a5fa464c2dddb35ddfb'),
    name: 'Афиноген Некрасов',
    email: 'Kristina_Hagenes@mail.ru',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$g4.cXpnAbOW9p3n13TewEeT5ZCYjHiOT2AVY7l6xMz0BxUnQzPay6',
    avatar: '',
    birthday: '1967-12-16T22:30:45.703Z',
    city: 'Москва',
    createdAt: '2022-12-17T10:35:40.447Z',
    updatedAt: '2023-01-08T10:28:37.483Z',
    resume:
      'Систему таким в модель формирования. Особенности вызывает значительной повышение. Нашей массового процесс особенности обуславливает.',
    specialty: ['safety'],
  },
  {
    _id: ObjectId('ed0ecdaff0b3a7a0f5bcabf5'),
    name: 'Георгий Козлов',
    email: 'Madalyn44@yahoo.com',
    role: 'заказчик',
    passwordHash:
      '$2b$10$xAC5g14nkzrb37hQJqm1oeddW.LdiJOrXvIzPhtnDhG/uNxhKYCAu',
    avatar: '',
    birthday: '1979-03-31T15:06:44.408Z',
    city: 'Москва',
    createdAt: '2022-12-27T22:07:44.346Z',
    updatedAt: '2023-01-12T02:48:16.831Z',
    resume:
      'Структура показывает особенности а правительством же постоянное богатый. Административных актуальность проблем правительством же от что проверки структуры активом. Соответствующих следует сомнений разнообразный важные вызывает намеченных нас создание собой.',
  },
  {
    _id: ObjectId('baeae284cade5eebec8e109b'),
    name: 'Аггей Зыков',
    email: 'Axel46@hotmail.com',
    role: 'заказчик',
    passwordHash:
      '$2b$10$i98.dyInjDtHwEM5/IwT2uMPmVlYm2Iuv5eP4IqdWVoyQO99qED4C',
    avatar: '',
    birthday: '2003-05-17T03:47:32.519Z',
    city: 'Москва',
    createdAt: '2023-01-01T05:52:29.708Z',
    updatedAt: '2023-01-08T14:16:43.644Z',
    resume:
      'Развития информационно-пропогандистское забывать прогресса задача. Ресурсосберегающих насущным особенности кадровой инновационный предпосылки. Же создание зависит воздействия актуальность.',
  },
  {
    _id: ObjectId('c95e343e0253f47daeda7e1f'),
    name: 'Валерий Фомичев',
    email: 'Alexie.Huels@gmail.com',
    role: 'заказчик',
    passwordHash:
      '$2b$10$Z5fHOKiyPY3lmm0u4Su5..KynNx4YHUbj57OIhTAG5lswpQmje9om',
    avatar: '',
    birthday: '1985-01-10T19:55:47.120Z',
    city: 'Москва',
    createdAt: '2022-12-27T23:34:41.697Z',
    updatedAt: '2023-01-08T09:17:27.046Z',
    resume:
      'Задача курс занимаемых также на требует опыт укрепления прежде. Постоянный намеченных целесообразности намеченных прогресса образом кадров путь. За вызывает способствует различных организационной зависит этих базы сомнений предпосылки.',
  },
  {
    _id: ObjectId('3fd83f9067dfdeba8688bbae'),
    name: 'Радим Терентьев',
    email: 'Tavares.Bednar@yahoo.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$2bTmE/mXsQ1CqG78YbqcbOJP4vMvSn8CRnhB.g5nzc2.DH6gvrJg6',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1157.jpg',
    birthday: '1978-02-25T19:34:05.014Z',
    city: 'Владивосток',
    createdAt: '2022-12-31T13:36:43.919Z',
    updatedAt: '2023-01-08T16:24:03.167Z',
    resume:
      'Высшего представляет систему анализа постоянный. Обучения разнообразный активности общественной оценить равным и место уточнения соответствующих. Участия гражданского другой не степени количественный общественной.',
    specialty: [],
  },
  {
    _id: ObjectId('ca182c1fb29f58e398a14e35'),
    name: 'Август Горбунов',
    email: 'Verda_Ullrich94@yahoo.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$QUscENQqGrTWEIVgbFpn7O9g.rIK6awouaWjhY/zuAQcbd1ZO59Iy',
    avatar: '',
    birthday: '2001-11-24T20:14:08.530Z',
    city: 'Владивосток',
    createdAt: '2023-01-09T14:37:52.283Z',
    updatedAt: '2023-01-10T17:23:02.726Z',
    resume:
      'Развития обществом системы ресурсосберегающих демократической. Целесообразности идейные показывает. Активом эксперимент всего а дальнейшее.',
    specialty: [],
  },
  {
    _id: ObjectId('a89eb8d22cb2bdb4a8aa7f5b'),
    name: 'Милан Носков',
    email: 'Alek.Marks@yahoo.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$d5ZzsrYBbHJqxGe3FChhLexJm0dUjwZuAOPR5CDRr7MxSbDagoeeS',
    avatar: '',
    birthday: '1962-07-16T22:02:39.737Z',
    city: 'Владивосток',
    createdAt: '2022-12-27T07:22:01.699Z',
    updatedAt: '2023-01-10T10:48:21.059Z',
    resume:
      'Нас сложившаяся информационно-пропогандистское определения сознания ресурсосберегающих предложений влечёт. Уровня шагов соответствующих насущным актуальность забывать количественный. Уточнения повышение управление целесообразности.',
    specialty: ['pagan', 'pinecone', 'truck'],
  },
  {
    _id: ObjectId('10332c144025e1beac4d413c'),
    name: 'Август Костин',
    email: 'Gillian_Herzog10@hotmail.com',
    role: 'заказчик',
    passwordHash:
      '$2b$10$C9Uq6E/htfxkdVAGJk/TMug/BbQEi56hF0s1mBHBT9Uh1uu8jw4Ku',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1233.jpg',
    birthday: '1952-05-13T08:02:28.951Z',
    city: 'Москва',
    createdAt: '2022-12-28T14:17:57.239Z',
    updatedAt: '2023-01-09T23:19:10.178Z',
  },
  {
    _id: ObjectId('fedaebef0bba13a767c0e3ad'),
    name: 'Фирс Козлов',
    email: 'Kristofer.Dach@mail.ru',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$orepO9CrIPM8r2WZzGFMuOkQy3oCN7/fS.KpQ25gjb4SLU6LxgwDm',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1230.jpg',
    birthday: '1994-06-09T05:31:53.936Z',
    city: 'Владивосток',
    createdAt: '2022-12-17T14:06:55.789Z',
    updatedAt: '2023-01-10T21:55:14.355Z',
    resume:
      'Социально-экономическое структуры соответствующей новых курс играет. Шагов создание общественной с место правительством с. Влечёт социально-экономическое обучения.',
    specialty: ['motion', 'recording', 'suck', 'ass'],
  },
  {
    _id: ObjectId('f5d50d7a7bf111cdaa50ad97'),
    name: 'Феликс Николаев',
    email: 'Carmen.Jacobi@yandex.ru',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$xdARBIAvCGc2GV8PVVmMjOlVxXscKSaqQUNX5rULVoHK6oyWK2rp.',
    avatar: '',
    birthday: '1954-01-30T01:34:20.897Z',
    city: 'Санкт-Петербург',
    createdAt: '2023-01-04T01:16:59.245Z',
    updatedAt: '2023-01-08T10:12:36.283Z',
    specialty: ['screenwriting', 'musician', 'civilian', 'slang', 'processor'],
  },
  {
    _id: ObjectId('eba2c7ce3b879ea9cf2dfefd'),
    name: 'Конон Семенов',
    email: 'Amaya51@hotmail.com',
    role: 'заказчик',
    passwordHash:
      '$2b$10$rC7/zEh/XJwdLeSINuZwmuPWDLLU7wnIN8baksv20xF4A6x.4gcoC',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/893.jpg',
    birthday: '1977-05-20T11:05:30.702Z',
    city: 'Москва',
    createdAt: '2023-01-02T15:32:51.246Z',
    updatedAt: '2023-01-11T17:15:41.320Z',
  },
  {
    _id: ObjectId('56b40ccec41bf44fa36b4cfa'),
    name: 'Адриан Назаров',
    email: 'Aric.Kub@gmail.com',
    role: 'исполнитель',
    passwordHash:
      '$2b$10$phtspTJeiOryEFlrZ0NxOOpadoPMeywet1oHGWpVD/PHrN8tsO2MW',
    avatar: '',
    birthday: '1993-05-29T03:42:30.768Z',
    city: 'Москва',
    createdAt: '2023-01-05T02:47:08.416Z',
    updatedAt: '2023-01-09T15:53:17.815Z',
    resume:
      'Показывает обеспечивает отметить создание задания подготовке рамки определения настолько. Деятельности концепция деятельности модернизации. Важные повышение всего эксперимент.',
    specialty: ['pansy', 'surprise', 'pride'],
  },
  {
    _id: ObjectId('7ad2b8a025c517dfcf5c4ccb'),
    name: 'Андрей Маслов',
    email: 'Deon.Barton@yandex.ru',
    role: 'заказчик',
    passwordHash:
      '$2b$10$8EALYF0V3jozIpm99wIzLuycaL8/xV1PMJiCPp3FciWR8oGfRAJqu',
    avatar: '',
    birthday: '1956-07-05T21:25:25.622Z',
    city: 'Владивосток',
    createdAt: '2022-12-23T19:49:59.234Z',
    updatedAt: '2023-01-08T06:03:54.559Z',
  },
  {
    _id: ObjectId('cb63c5422d98c9d365de5f2e'),
    name: 'Аполлон Третьяков',
    email: 'Theodora_Moore@yahoo.com',
    role: 'заказчик',
    passwordHash:
      '$2b$10$CJ78YWjy4gMGvlHXKgZef.L/vPNLxmDeOjpmPy.Iqcb5sAiGSlJfi',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/407.jpg',
    birthday: '1965-06-30T21:42:56.173Z',
    city: 'Москва',
    createdAt: '2023-01-11T00:17:09.070Z',
    updatedAt: '2023-01-08T22:50:08.826Z',
  },
  {
    _id: ObjectId('b3fba0ac911d5fcb0cf9d3cf'),
    name: 'Эммануил Потапов',
    email: 'Willow.Raynor@gmail.com',
    role: 'заказчик',
    passwordHash:
      '$2b$10$oDy7uIYEn4TBv0r8g152G.HSGoJ5wdTKfKwHL09KksJEokCxXZq0a',
    avatar: '',
    birthday: '1994-10-30T17:48:13.881Z',
    city: 'Москва',
    createdAt: '2022-12-16T02:24:38.500Z',
    updatedAt: '2023-01-12T10:32:31.523Z',
    resume:
      'Систему начало от направлений курс забывать проблем важную. Систему укрепления систему отметить нами предложений следует образом. Организационной идейные обучения.',
  },
  {
    _id: ObjectId('8efaeb738c20cd6da800db51'),
    name: 'Гедеон Тетерин',
    email: 'Timmothy6@ya.ru',
    role: 'заказчик',
    passwordHash:
      '$2b$10$5yG9E7QoD8UxKlKGYR0iruCzFZltBxA3xqbw6USp0WpsEg6Vzl9be',
    avatar:
      'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/995.jpg',
    birthday: '1973-03-29T02:06:42.307Z',
    city: 'Владивосток',
    createdAt: '2023-01-11T10:00:36.953Z',
    updatedAt: '2023-01-09T01:41:20.980Z',
    resume:
      'Качественно позиции базы поэтапного требует таким также. Сложившаяся условий образом кругу эксперимент структуры активом концепция. Всего степени дальнейшее.',
  },
]);
