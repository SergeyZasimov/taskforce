# Запуск сервисов

## Сервис "Users"

- Находясь в директории `taskforce/apps/users` выполните команду `docker-compose up -d` для создания контейнера с базой данных
- Перейдите наверх в директорию `taskforce`
- В директории `./environments` cоздайте файл с переменными окружения `.users.env` по примеру `.users.env-example`
- Выполните команду `nx run users:serve` для запуска сервиса
- Для проверки сервиса используйте OpenApi документацию, которая доступна по адресу `http://localhost:3332/spec/users` или файлы `.http` в директориях модулей

## Сервис "Tasks"

- Находясь в директории `taskforce/apps/tasks` выполните команду `docker-compose up -d` для создания контейнера с базой данных
- В директории `taskforce/apps/tasks` создайте файл `.env` по примеру `taskforce/apps/tasks/prisma/.env-example` для подклучения к базе данных
- Перейдите наверх в директорию `taskforce`
- В директории `./environments` cоздайте файл с переменными окружения `.tasks.env` по примеру `.tasks.env-example`
- Для подготовки БД выполните команду `npm run db-prepare`
- Выполните команду `nx run tasks:serve` для запуска сервиса
- Для проверки сервиса используйте OpenApi документацию, которая доступна по адресу `http://localhost:3333/spec/tasks` или файлы `.http` в директориях модулей

## Сервис "Notify"

- Находясь в директории `taskforce/apps/notify` выполните команду `docker-compose up -d` для создания контейнера с базой данных
- Перейдите наверх в директорию `taskforce`
- В директории `./environments` cоздайте файл с переменными окружения `.notify.env` по примеру `.notify.env-example`
- Выполните команду `nx run notify:serve` для запуска сервиса

Когда созданы контейнеры для баз данных и файлы с переменными окружения, можно запустить все сервисы командой `nx run-many --target=serve --projects='users,tasks,notify'`, находясь в директории `taskforce`
