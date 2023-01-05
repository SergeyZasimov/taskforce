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
import {
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiResponse } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { GetCurrentUser } from '../../decorators/get-current-user.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { MongoidValidationPipe } from '../../pipes/mongoid-validation.pipe';
import { ChangeTaskCounterQuery } from '../../query/change-tasks-counter.query';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileService } from './profile.service';
import { ProfileRdo } from './rdo/profile.rdo';
import { Express } from 'express';
import { Multer } from 'multer';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  public async uploadFile(
    @GetCurrentUser('sub') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500_000 }),
          new FileTypeValidator({ fileType: /[\w/-]+.(jpg|png|jpeg)/ }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    const updatedUser = this.profileService.updateAvatar(id, {
      avatar: file.filename,
    });
    return fillObject(ProfileRdo, updatedUser, (await updatedUser).role);
  }

  @Patch('')
  public async update(
    @GetCurrentUser('sub') id: string,
    @Body() dto: UpdateUserDto
  ) {
    return this.profileService.update(id, dto);
  }

  @Get(':id/change-tasks-counter')
  public async incTasks(
    @Param('id', MongoidValidationPipe) id: string,
    @Query() query: ChangeTaskCounterQuery
  ) {
    return this.profileService.changeTasksCounter(id, query);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User details',
    type: ProfileRdo,
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.profileService.getUser(id);
    return fillObject(ProfileRdo, existUser, existUser.role);
  }
}
