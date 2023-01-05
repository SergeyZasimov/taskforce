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
import { Patch } from '@nestjs/common/decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist';
import { fillObject } from '@taskforce/core';
import { MongoidValidationPipe } from '../../pipes/mongoid-validation.pipe';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { UserRdo } from './rdo/user.rdo';
import { GetCurrentUser } from '../../decorators/get-current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserRdo,
  })
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully login',
    type: UserRdo,
  })
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.loginUser(verifiedUser);
    return fillObject(LoggedUserRdo, loggedUser);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  public async changePassword(
    @GetCurrentUser('sub') id: string,
    @Body() dto: ChangePasswordDto
  ) {
    return this.authService.changePassword(id, dto);
  }
}
