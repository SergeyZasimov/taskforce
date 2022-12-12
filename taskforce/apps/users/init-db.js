db = db.getSiblingDB(process.env['MONGO_INITDB_DATABASE']);
db.createCollection('users');

db.users.insertMany([
  {
    name: 'Севастьян Шестаков',
    email: 'Olin_Schinner@ya.ru',
    avatar: '',
    birthday: '1975-04-21T11:38:03.271Z',
    city: 'Москва',
    role: 'contractor',
    passwordHash: '$2b$05$V8C6l/vwzcMfmnCiEnE/zeFiY//T7iue8cFONwbulsSD211t.EnPm'
  },
  {
    name: 'Никанор Комиссаров',
    email: 'Arch.Daniel@yandex.ru',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1208.jpg',
    birthday: '1983-12-19T13:54:54.406Z',
    city: 'Санкт-Петербург',
    role: 'customer',
    passwordHash: '$2b$05$kMO.jSUhhMkslShwH8xg1eO70n4iCn3nnxWJRfOSmskl0Vas.d7h2'
  },
  {
    name: 'Владимир Шилов',
    email: 'Anastasia84@yandex.ru',
    avatar: '',
    birthday: '1984-12-25T23:48:18.648Z',
    city: 'Москва',
    role: 'customer',
    passwordHash: '$2b$05$O9DbPgChlLqn3DkDYTpHku03FGzLsKvokK87Ue8YEPx3Hkl6c3ou2'
  },
  {
    name: 'Панфил Киселев',
    email: 'Abby9@yahoo.com',
    avatar: '',
    birthday: '1973-12-21T09:26:51.497Z',
    city: 'Москва',
    role: 'customer',
    passwordHash: '$2b$05$PAK.vkZCr/1RWZrL8FI2LePRHcP34yngJQK7OWoddAPnDZ/Xo1S66'
  },
  {
    name: 'Леон Суворов',
    email: 'Axel26@gmail.com',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/592.jpg',
    birthday: '1966-04-09T04:17:51.867Z',
    city: 'Санкт-Петербург',
    role: 'customer',
    passwordHash: '$2b$05$6KGBCgq2JIz9h0lnUcLwge0edxfy.n7fNaalBwuEKWVyimoFtGYSK'
  },
  {
    name: 'Митофан Кузнецов',
    email: 'Kole_Schmitt@hotmail.com',
    avatar: '',
    birthday: '1952-09-30T00:33:08.718Z',
    city: 'Москва',
    role: 'contractor',
    passwordHash: '$2b$05$e5/G5orr8CLmci4RN74eQuS3Epq3mANzpAYBvu4nMs5lktxWa.UrS'
  },
  {
    name: 'Флорентин Егоров',
    email: 'Troy_Kiehn@hotmail.com',
    avatar: '',
    birthday: '1994-01-09T09:56:20.310Z',
    city: 'Санкт-Петербург',
    role: 'customer',
    passwordHash: '$2b$05$U9oLS7B5tKBW0p6vvrP7JeGIm83ZPM8QRL26Iucmh7eXG3YbxJHiO'
  },
  {
    name: 'Рубен Горшков',
    email: 'Khalil26@gmail.com',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/770.jpg',
    birthday: '1943-04-28T07:57:50.454Z',
    city: 'Москва',
    role: 'customer',
    passwordHash: '$2b$05$6ycowPvPyE6zcSZEE8R1des/YQvEYvrkvLaVWIhIwyAWrudnzg0O6'
  },
  {
    name: 'Юлиан Кудрявцев',
    email: 'Arnaldo_Boehm@yahoo.com',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/698.jpg',
    birthday: '1972-06-26T05:30:29.519Z',
    city: 'Владивосток',
    role: 'contractor',
    passwordHash: '$2b$05$0z4Ce7u2VMJrReYuBFNRquy.JNhuFNHcZflWhFi7MvmVJv8LC7I1i'
  },
  {
    name: 'Максимильян Макаров',
    email: 'Ludie.Deckow@hotmail.com',
    avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1168.jpg',
    birthday: '1975-07-21T15:29:42.936Z',
    city: 'Владивосток',
    role: 'contractor',
    passwordHash: '$2b$05$xk1JXvZ2lAmOV5t3uqT3e.9LrV/cqJwb4G0cwXge944iRnIn/O4Qa'
  }
])
