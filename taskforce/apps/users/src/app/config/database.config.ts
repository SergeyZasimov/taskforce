import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  databaseName: process.env.MONGO_DB,
  host: process.env.MONGO_HOST,
  port: process.env.MONGO_PORT,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
  authBase: process.env.MONGO_AUTH_BASE,
}));
