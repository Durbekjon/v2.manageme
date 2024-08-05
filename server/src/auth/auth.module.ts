import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CoreModule } from 'src/core/core.module';
import { AuthRepository } from './auth.repository';
import { TokensService } from './tokens.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, TokensService],
  imports: [CoreModule],
})
export class AuthModule {}
