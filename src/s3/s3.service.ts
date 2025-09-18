import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
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

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const key = randomName();
    const loader = new PutObjectCommand({
      Bucket: getEnvVar('AWS_BUCKET'),
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      const result = await this.s3Client.send(loader);
      return `https://${getEnvVar('AWS_BUCKET')}.s3.${getEnvVar('AWS_REGION')}.amazonaws.com/${key}`;
    } catch (error) {
      console.error('S3 upload failed:', error);
      throw new HttpException('File upload failed', 500);
    }
  }
}
