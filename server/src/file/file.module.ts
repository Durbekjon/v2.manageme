import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { S3Service } from './s3.service';
import { CoreModule } from 'src/core/core.module';

@Module({
  controllers: [FileController],
  providers: [FileService, S3Service],
  imports: [CoreModule],
})
export class FileModule {}
