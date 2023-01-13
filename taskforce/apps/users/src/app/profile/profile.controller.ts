import {
  Body,
  Controller,
  Get,
  HttpCode,
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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';
import { ProfileService } from './profile.service';
import { ProfileRdo } from './rdo/profile.rdo';
import { Express } from 'express';
import { Multer } from 'multer';
import { ResponseDescription, ApiOperationDescriptions } from '../app.constant';
import {
  BadRequestErrorRdo,
  NotFoundErrorRdo,
  UnauthorizedErrorRdo,
} from '../error/rdo';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({ description: ApiOperationDescriptions.Upload })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    schema: {
      description: 'Путь до изображения',
      example: './avatar.jpg',
      type: 'object',
      properties: {
        avatar: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.UploadAvatar,
    type: ProfileRdo,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ResponseDescription.BadRequest,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ResponseDescription.Unauthorized,
    type: UnauthorizedErrorRdo,
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('avatar'))
  @UseGuards(JwtAuthGuard)
  @Post('upload-avatar')
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

  @ApiOperation({ description: ApiOperationDescriptions.Update })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.UploadAvatar,
    type: ProfileRdo,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ResponseDescription.BadRequest,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ResponseDescription.Unauthorized,
    type: UnauthorizedErrorRdo,
  })
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

  @ApiOperation({ description: ApiOperationDescriptions.Show })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.ShowUser,
    type: ProfileRdo,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ResponseDescription.BadRequest,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ResponseDescription.Unauthorized,
    type: UnauthorizedErrorRdo,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: ResponseDescription.NotFound,
    type: NotFoundErrorRdo,
  })
  @ApiBearerAuth()
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.profileService.getUser(id);
    return fillObject(ProfileRdo, existUser, existUser.role);
  }
}
