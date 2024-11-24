import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Patch,
  Param,
  ForbiddenException,
} from '@nestjs/common';
import { LoginDto } from 'src/database/dto/login.dto';
import { RegisterDto } from 'src/database/dto/register.dto';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { request } from 'express';
import { Role } from 'src/constants/enumRole.constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile(@Request() req) {
    return req.user;
  }

  @Patch('update-role/:userId')
  @UseGuards(AuthGuard)
  async updateRole(
    @Param('userId') userId: string,
    @Body('role') role: Role,
    @Request() req: any,
  ) {
    const user = req.user;

    if (user.role !== Role.ADMIN) {
      throw new ForbiddenException(
        'Acceso denegado: Solo administradores pueden actualizar los roles',
      );
    }

    return await this.authService.updateRole(userId, role);
  }
}
