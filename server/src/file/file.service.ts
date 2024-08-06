import { Injectable } from '@nestjs/common';
import { S3Service } from './s3.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { DeleteDto } from './dto/delete.dto';
import { FileParams } from './dto/file.params';
import { BUCKET_NAME } from 'consts/aws.options';

@Injectable()
export class FileService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly prisma: PrismaService,
  ) {}

  async upload(file: any) {
    const data = await this.s3Service.uploadFile(file);

    return await this.prisma.file.create({
      data: {
        key: data.key,
        location: data.location,
        size: data.size,
      },
    });
  }

  async delete(data: DeleteDto) {
    data.id.filter(async (id) => {
      const object = await this.prisma.file.findUnique({ where: { id } });

      const params: FileParams = {
        Bucket: BUCKET_NAME,
        Key: object.key,
      };

      await this.s3Service.deleteFile(params);
      await this.prisma.file.delete({ where: { id } });

      return true;
    });

    return {
      status: 'OK',
      result: 'Data deleted',
    };
  }
}
