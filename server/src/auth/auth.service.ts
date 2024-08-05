import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { TokensService } from './tokens.service';
import { AuthDto } from './dto/Auth.dto';
import { HTTP_MESSAGES } from 'consts/http-messages';
import * as bcrypt from 'bcrypt';
import { SALT_ROUNDS } from 'consts/jwt-options';
@Injectable()
export class AuthService {
  constructor(
    private repository: AuthRepository,
    private tokens: TokensService,
  ) {}

  async register(data: AuthDto) {
    const existData = await this.repository.findUserByUsername(data.username);

    if (existData) {
      throw new HttpException(HTTP_MESSAGES.USER_EXIST, HttpStatus.CONFLICT);
    }

    data.password = await bcrypt.hash(data.password, SALT_ROUNDS);

    const user = await this.repository.register(data);

    const tokens = await this.tokens.createTokens(user.id);

    delete user.password;
    return {
      data: user,
      tokens,
    };
  }

  async login(data: AuthDto) {
    const user = await this.repository.findUserByUsername(data.username);

    if (!user) {
      throw new HttpException(
        HTTP_MESSAGES.USER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordCorrect: boolean = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        HTTP_MESSAGES.INCORRECT_PASS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const tokens = await this.tokens.createTokens(user.id);

    delete user.password;
    return {
      data: user,
      tokens,
    };
  }
}
