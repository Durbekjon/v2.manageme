import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  JWT_EXPIRES_IN,
  REFRESH_EXPIRES_IN,
  REFRESH_SECRET,
} from '../../consts/jwt-options';

@Injectable()
export class TokensService {
  constructor(private readonly jwtService: JwtService) {}

  async createTokens(userId: string) {
    const access_token = await this.createAccessToken(userId);
    const refresh_token = await this.createRefreshToken(userId);

    return {
      access_token,
      refresh_token,
    };
  }

  private async createAccessToken(userId: string) {
    const expiresIn = JWT_EXPIRES_IN;
    const accessToken = await this.jwtService.signAsync({ id: userId });

    return {
      token: accessToken,
      expiresIn,
    };
  }

  private async createRefreshToken(userId: string) {
    const expiresIn = REFRESH_EXPIRES_IN;

    const refreshToken = await this.jwtService.signAsync(
      {
        id: userId,
      },
      {
        secret: REFRESH_SECRET,
        expiresIn,
      },
    );

    return {
      token: refreshToken,
      expiresIn,
    };
  }
}
