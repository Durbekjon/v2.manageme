import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { AuthDto } from './dto/Auth.dto';
// import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async register(data: AuthDto) {
    return this.prisma.user.create({ data });
  }

  async findUserByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }
}
