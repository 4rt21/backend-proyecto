import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { randomName } from 'src/util/crypto/hash.util';

@Injectable()
export class ImagesService {
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    await fs.promises.mkdir(folder, { recursive: true });

    const key = randomName();
    const ext = path.extname(file.originalname) || '.jpg';
    const filePath = path.join(folder, `${key}${ext}`);

    await fs.promises.writeFile(filePath, file.buffer);
    return filePath;
  }

  async deleteFile(filePath: string): Promise<void> {
    await fs.promises.unlink(filePath);
  }

  async modifyFile(
    filePath: string,
    file: Express.Multer.File,
  ): Promise<string> {
    await this.deleteFile(filePath);
    const folder = path.dirname(filePath);
    return this.uploadFile(file, folder);
  }
}
