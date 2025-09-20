import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { HttpException, Injectable } from '@nestjs/common';
import { randomName } from 'src/util/crypto/hash.util';

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

@Injectable()
export class S3Service {
  private s3Client = new S3Client({
    region: getEnvVar('AWS_REGION'),
    credentials: {
      accessKeyId: getEnvVar('AWS_KEY_ID'),
      secretAccessKey: getEnvVar('AWS_SECRET_KEY'),
    },
  });

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const key = randomName();
    const loader = new PutObjectCommand({
      Bucket: getEnvVar('AWS_BUCKET'),
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      const result = await this.s3Client.send(loader);
      return `${folder}/${key}`;
    } catch (error) {
      console.error('S3 upload failed:', error);
      throw new HttpException('File upload failed', 500);
    }
  }

  async deleteFile(key: string): Promise<void> {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: getEnvVar('AWS_BUCKET'),
      Key: key,
    });

    try {
      await this.s3Client.send(deleteCommand);
    } catch (error) {
      console.error('S3 delete failed:', error);
      throw new HttpException('File deletion failed', 500);
    }
  }

  async getPresignedUrl(key: string): Promise<string> {
    const getCommand = new GetObjectCommand({
      Bucket: getEnvVar('AWS_BUCKET'),
      Key: key,
    });

    return getSignedUrl(this.s3Client, getCommand, { expiresIn: 3600 });
  }
}
