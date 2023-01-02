import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { User } from '@taskforce/shared-types';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { ChangeTaskCounterQuery } from '../query/change-tasks-counter.query';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileService } from './profile.service';
import { ProfileRdo } from './rdo/profile.rdo';

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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User details',
    type: ProfileRdo,
  })
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.profileService.getUser(id);
    return fillObject(ProfileRdo, existUser, existUser.role);
  }
}
