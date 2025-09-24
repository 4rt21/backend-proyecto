import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { randomName } from 'src/util/crypto/hash.util';

@Injectable()
export class ImagesService {
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const key = randomName();
    folder = `${folder}/${key}.jpg`;
    const buffer = Buffer.from(file.buffer);
    await fs.promises.writeFile(folder, buffer);
    return folder;
  }

  async deleteFile(path: string): Promise<void> {
    const unlink = fs.promises.unlink;
    return await unlink(path);
  }

  async modifyFile(
    path: string,
    file: Express.Multer.File,
  ): Promise<string> {
    await this.deleteFile(path);
    return this.uploadFile(file, path);
  }
}
