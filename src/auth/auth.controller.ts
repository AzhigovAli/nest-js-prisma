/* eslint-disable @typescript-eslint/no-unused-vars */
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { ApiBody, ApiTags, ApiOperation } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto })
  async login(@Request() req) {
    try {
      return this.authService.login(req.user);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  register(@Body() dto: CreateUserDto) {
    try {
      return this.authService.register(dto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('code-send')
  @ApiOperation({ summary: 'Send SMS code' })
  sendSms() {
    try {
      return this.authService.sendSms();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Patch('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  resetPassword(@Body() dto: CreateUserDto) {
    try {
      return this.authService.resetPassword(dto.email, dto.password);
    } catch (error) {
      throw new Error(error);
    }
  }
}
