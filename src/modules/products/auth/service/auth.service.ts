import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from 'src/database/dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { PerfilService } from 'src/modules/products/perfil/service/perfil.service';
import { LoginDto } from 'src/database/dto/login.dto';
import { Role } from 'src/constants/enumRole.constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly perfilService: PerfilService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ password, email, name, role }: RegisterDto) {
    const user = await this.perfilService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('Email al ready exists');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.perfilService.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return {
      message: 'user created successfully',
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.perfilService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid Email');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { email: user.email, role: user.role };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      email: user.email,
    };
  }

  async updateRole(userId: string, role: string): Promise<{ message: string }> {
    const user = await this.perfilService.findOneById(userId);

    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    if (!['validacion', 'radicacion'].includes(role)) {
      throw new BadRequestException('rol no valido');
    }
    await this.perfilService.updateUser(userId, { role });

    return {
      message: `Rol del usuario con ID ${userId} actualizado a ${role}`,
    };
  }
}
