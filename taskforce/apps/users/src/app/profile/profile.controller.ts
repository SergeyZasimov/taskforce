import { Body, Controller, Param, Post } from '@nestjs/common';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post(':id')
  public async update(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() dto: UpdateUserDto
  ) {
    return this.profileService.update(id, dto);
  }
}
