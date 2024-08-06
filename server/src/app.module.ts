import { Module } from '@nestjs/common';
import { PrismaService } from './core/prisma/prisma.service';
import { PrismaModule } from './core/prisma/prisma.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [PrismaModule, CoreModule, AuthModule, FileModule],
  providers: [PrismaService],
})
export class AppModule {}
