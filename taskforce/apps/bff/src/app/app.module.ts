import { Module } from '@nestjs/common';
import { ENV_FILE_PATH } from './app.constant';
import { validateEnvironments } from './env.validation';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { CommentModule } from './comment/comment.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      validate: validateEnvironments,
    }),
    AuthModule,
    ProfileModule,
    CommentModule,
    FeedbackModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
