import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstants } from 'src/constants/jwt.constants';
import { Role } from 'src/constants/enumRole.constants';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
    const requiredRole = this.reflector.get<string>(
      'role',
      context.getHandler(),
    );
    if (requiredRole) {
      const user = request.user;
      if (user.role !== requiredRole) {
        throw new ForbiddenException('Acceso denegado: rol insuficiente');
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type == 'Bearer' ? token : undefined;
  }
}
