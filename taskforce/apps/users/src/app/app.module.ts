import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ENV_FILE_PATH } from './app.constant';
import databaseConfig from './config/database.config';
import { validateEnvironments } from './env.validation';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { getMongoDbConfig } from './config/mongodb.config';
import { jwtOptions } from './config/jwt.config';
import { rabbitMqOptions } from './config/rabbitmq.config';
import { ReviewModule } from './review/review.module';
import { ProfileModule } from './profile/profile.module';
import { multerOptions } from './config/multer.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [databaseConfig, jwtOptions, rabbitMqOptions, multerOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
    UserModule,
    AuthModule,
    ReviewModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
