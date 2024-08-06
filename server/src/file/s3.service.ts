import { Injectable } from '@nestjs/common';
import {
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import {
  ACCESS_KEY_ID,
  BUCKET_NAME,
  BUCKET_REGION,
  SECRET_ACCESS_KEY,
} from 'consts/aws.options';
import { randomUUID } from 'crypto'; // Import the UUID module
import { FileParams } from './dto/file.params';

@Injectable()
export class S3Service {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: BUCKET_REGION,
      credentials: {
        accessKeyId: ACCESS_KEY_ID,
        secretAccessKey: SECRET_ACCESS_KEY,
      },
    });
  }

  async uploadFile(file: any) {
    const extName = file.mimetype.split('/')[1];
    const uniqueKey = `${randomUUID()}.${extName}`;
    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: uniqueKey,
      Body: file.buffer,
      ContentType: file.mimetype, // Corrected to use file.mimetype
    };

    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      return {
        key: uniqueKey,
        size: file.size,
        location: `https://${BUCKET_NAME}.s3.${BUCKET_REGION}.amazonaws.com/${uniqueKey}`,
      };
    } catch (err) {
      throw new Error('Error uploading file: ' + err.message);
    }
  }

  async deleteFile(params: FileParams) {
    const deleteParams = {
      Bucket: params.Bucket,
      Key: params.Key,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(deleteParams));
      return { message: 'File deleted successfully' };
    } catch (err) {
      throw new Error('Error deleting file: ' + err.message);
    }
  }
}
