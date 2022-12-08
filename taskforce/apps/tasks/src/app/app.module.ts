import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [PrismaModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
