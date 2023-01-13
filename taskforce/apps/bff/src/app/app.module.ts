import { Module } from '@nestjs/common';
import { ENV_FILE_PATH } from './app.constant';
import { validateEnvironments } from './env.validation';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      validate: validateEnvironments,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
