import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
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
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileService } from './profile.service';
import { ProfileRdo } from './rdo/profile.rdo';
import { Express } from 'express';
import { Multer } from 'multer';
import { UPLOAD_FIELD_NAME } from '../app.constant';
import { Route, RouteModule } from '@taskforce/shared-types';
import {
  ApiProfileShowOk,
  ApiProfileShowOperation,
  ApiUpdateProfileBody,
  ApiUpdateProfileOk,
  ApiUpdateProfileOperation,
  ApiUploadAvatarBody,
  ApiUploadAvatarOk,
  ApiUploadAvatarOperation,
  ApiUserBadRequest,
  ApiUserNotFound,
  ApiUserUnauthorized,
  UsersApiTag,
} from '@taskforce/api-documentation';

@ApiTags(UsersApiTag.Profile)
@Controller(RouteModule.Profile)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiUploadAvatarOperation()
  @ApiConsumes('multipart/form-data')
  @ApiUploadAvatarBody(UPLOAD_FIELD_NAME)
  @ApiUploadAvatarOk()
  @ApiUserBadRequest()
  @ApiUserUnauthorized()
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor(UPLOAD_FIELD_NAME))
  @UseGuards(JwtAuthGuard)
  @Post(Route.UploadAvatar)
  public async uploadFile(
    @GetCurrentUser('sub') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500_000 }),
          new FileTypeValidator({ fileType: /[\w/-]+.(jpg|png|jpeg)$/ }),
        ],
      })
    )
    file: Express.Multer.File
  ) {
    const updatedUser = await this.profileService.updateAvatar(id, {
      avatar: file.filename,
    });
    return fillObject(ProfileRdo, updatedUser, updatedUser.role);
  }

  @ApiUpdateProfileOperation()
  @ApiUpdateProfileBody()
  @ApiUpdateProfileOk()
  @ApiUserBadRequest()
  @ApiUserUnauthorized()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('')
  public async update(
    @GetCurrentUser('sub') id: string,
    @Body() dto: UpdateUserDto
  ) {
    const updatedUser = await this.profileService.update(id, dto);
    return fillObject(ProfileRdo, updatedUser, updatedUser.role);
  }

  @ApiProfileShowOperation()
  @ApiProfileShowOk()
  @ApiUserBadRequest()
  @ApiUserUnauthorized()
  @ApiUserNotFound()
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.profileService.getUser(id);
    return fillObject(ProfileRdo, existUser, existUser.role);
  }
}
