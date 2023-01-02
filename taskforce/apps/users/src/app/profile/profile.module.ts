import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { UserModule } from '../user/user.module';
import { ReviewModule } from '../review/review.module';

@Module({
  imports: [UserModule, ReviewModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
