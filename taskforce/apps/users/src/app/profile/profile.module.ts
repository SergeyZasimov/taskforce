import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserModule } from '../user/user.module';
import { ReviewModule } from '../review/review.module';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from '../../config/multer.config';

@Module({
  imports: [
    UserModule,
    ReviewModule,
    MulterModule.registerAsync(getMulterConfig()),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
