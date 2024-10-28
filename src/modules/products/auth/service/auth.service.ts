import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from 'src/database/dto/register.dto';

import * as bcryptjs from 'bcryptjs';
import { PerfilService } from 'src/modules/products/perfil/service/perfil.service';
import { LoginDto } from 'src/database/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly perfilService: PerfilService) {}

  async register({ password, email, name }: RegisterDto) {
    const user = await this.perfilService.findOneByEmail(email);

    if (user) {
      throw new BadRequestException('Email al ready exists');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.perfilService.create({
      name,
      email,
      password: hashedPassword,
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

    return {
      email: user.email,
    };
  }
}
