import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { ChangeTaskCounterQuery } from '../query/change-tasks-counter.query';
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

  @Get(':id/change-tasks-counter')
  public async incTasks(
    @Param('id') id: string,
    @Query() query: ChangeTaskCounterQuery
  ) {
    return this.profileService.changeTasksCounter(id, query);
  }
}
