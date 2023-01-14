import { Body, Controller, Get, Headers, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiProfileDetailOk,
  ApiProfileShowOperation,
  ApiTag,
  ApiUpdateProfileBody,
  ApiUpdateProfileOk,
  ApiUpdateProfileOperation,
  ApiUserBadRequest,
  ApiUserNotFound,
  ApiUserUnauthorized,
} from '@taskforce/api-documentation';
import { RouteModule } from '@taskforce/shared-types';
import { AUTHORIZATION_FIELD } from '../app.constant';
import { ProfileService } from './profile.service';

@ApiTags(ApiTag.Profile)
@Controller(RouteModule.Profile)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiUpdateProfileOperation()
  @ApiUpdateProfileBody()
  @ApiUpdateProfileOk()
  @ApiUserBadRequest()
  @ApiUserUnauthorized()
  @ApiBearerAuth()
  @Patch('')
  public async update(@Body() body, @Headers(AUTHORIZATION_FIELD) auth) {
    return await this.profileService.update(body, auth);
  }

  @ApiProfileShowOperation()
  @ApiProfileDetailOk()
  @ApiUserBadRequest()
  @ApiUserUnauthorized()
  @ApiUserNotFound()
  @ApiBearerAuth()
  @Get(':id')
  public async showDetail(
    @Param('id') id: string,
    @Headers(AUTHORIZATION_FIELD) auth
  ) {
    return await this.profileService.showDetail(id, auth);
  }
}
