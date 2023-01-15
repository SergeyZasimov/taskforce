import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RouteModule, Route } from '@taskforce/shared-types';
import { AuthService } from './auth.service';
import {
  UsersApiTag,
  ApiRegisterOk,
  ApiRegisterOperation,
  ApiRegisterBody,
  ApiUserBadRequest,
  ApiUserConflict,
  ApiLoginOperation,
  ApiLoginBody,
  ApiLoginOk,
  ApiPasswordError,
  ApiUserNotFound,
  ApiChangePasswordOperation,
  ApiUserChangePasswordOk,
  ApiUserUnauthorized,
  ApiChangePasswordBody,
} from '@taskforce/api-documentation';
import { AUTHORIZATION_FIELD } from '../app.constant';

@ApiTags(UsersApiTag.Auth)
@Controller(RouteModule.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiRegisterOperation()
  @ApiRegisterBody()
  @ApiRegisterOk()
  @ApiUserBadRequest()
  @ApiUserConflict()
  @Post(Route.Register)
  public async register(@Body() body) {
    return await this.authService.register(body);
  }

  @ApiLoginOperation()
  @ApiLoginBody()
  @ApiLoginOk()
  @ApiPasswordError()
  @ApiUserNotFound()
  @ApiUserBadRequest()
  @HttpCode(HttpStatus.OK)
  @Post(Route.Login)
  public async login(@Body() body) {
    return await this.authService.login(body);
  }

  @ApiChangePasswordOperation()
  @ApiChangePasswordBody()
  @ApiUserChangePasswordOk()
  @ApiUserBadRequest()
  @ApiPasswordError()
  @ApiUserUnauthorized()
  @ApiBearerAuth()
  @Patch(Route.ChangePassword)
  public async changePassword(
    @Body() body,
    @Headers(AUTHORIZATION_FIELD) auth
  ) {
    return await this.authService.changePassword(body, auth);
  }
}
