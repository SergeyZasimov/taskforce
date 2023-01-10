import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Patch } from '@nestjs/common/decorators';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { fillObject } from '@taskforce/core';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserRdo } from './rdo/user.rdo';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { ResponseDescription, ApiOperationDescriptions } from '../app.constant';
import {
  ConflictErrorRdo,
  BadRequestErrorRdo,
  UnauthorizedErrorRdo,
  NotFoundErrorRdo,
} from '../error/rdo';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ description: ApiOperationDescriptions.Register })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: ResponseDescription.CreateUser,
    type: UserRdo,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ResponseDescription.BadRequest,
    type: BadRequestErrorRdo,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ResponseDescription.Conflict,
    type: ConflictErrorRdo,
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @ApiOperation({ description: ApiOperationDescriptions.Login })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.LoginUser,
    type: LoggedUserRdo,
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
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ResponseDescription.BadRequest,
    type: BadRequestErrorRdo,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.loginUser(verifiedUser);
    return fillObject(LoggedUserRdo, loggedUser);
  }

  @ApiOperation({ description: ApiOperationDescriptions.PasswordChange })
  @ApiResponse({
    status: HttpStatus.OK,
    description: ResponseDescription.PasswordChange,
    type: UserRdo,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: ResponseDescription.Unauthorized,
    type: UnauthorizedErrorRdo,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ResponseDescription.BadRequest,
    type: BadRequestErrorRdo,
  })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  public async changePassword(
    @GetCurrentUser('sub') id: string,
    @Body() dto: ChangePasswordDto
  ) {
    const updateUser = this.authService.changePassword(id, dto);
    return fillObject(UserRdo, updateUser);
  }
}
