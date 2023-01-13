import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Patch } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist';
import { fillObject } from '@taskforce/core';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserRdo } from './rdo/user.rdo';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Route, RouteModule } from '@taskforce/shared-types';
import {
  ApiTag,
  ApiRegisterOk,
  ApiRegisterOperation,
  ApiRegisterBody,
  ApiUserBadRequest,
  ApiUserConflict,
  ApiLoginOperation,
  ApiLoginBody,
  ApiLoginOk,
  ApiUserNotFound,
  ApiChangePasswordOperation,
  ApiUserChangePasswordOk,
  ApiUserUnauthorized,
  ApiChangePasswordBody,
  ApiPasswordError,
} from '@taskforce/api-documentation';

@ApiTags(ApiTag.Auth)
@Controller(RouteModule.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiRegisterOperation()
  @ApiRegisterBody()
  @ApiRegisterOk()
  @ApiUserBadRequest()
  @ApiUserConflict()
  @Post(Route.Register)
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @ApiLoginOperation()
  @ApiLoginBody()
  @ApiLoginOk()
  @ApiPasswordError()
  @ApiUserNotFound()
  @ApiUserBadRequest()
  @HttpCode(HttpStatus.OK)
  @Post(Route.Login)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.loginUser(verifiedUser);
    return fillObject(LoggedUserRdo, loggedUser);
  }

  @ApiChangePasswordOperation()
  @ApiChangePasswordBody()
  @ApiUserChangePasswordOk()
  @ApiUserBadRequest()
  @ApiPasswordError()
  @ApiUserUnauthorized()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(Route.ChangePassword)
  public async changePassword(
    @GetCurrentUser('sub') id: string,
    @Body() dto: ChangePasswordDto
  ) {
    await this.authService.changePassword(id, dto);
  }
}
