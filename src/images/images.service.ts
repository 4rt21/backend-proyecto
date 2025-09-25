import { Injectable } from '@nestjs/common';
import fs from 'fs';
import path from 'path';
import { randomName } from 'src/util/crypto/hash.util';

@Injectable()
export class ImagesService {
  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const projectFolder = path.join(__dirname, '../../dist/public', folder);
    await fs.promises.mkdir(projectFolder, { recursive: true });

    const key = randomName();
    const ext = path.extname(file.originalname) || '.jpg';
    const filePath = path.join(projectFolder, `${key}${ext}`);

    await fs.promises.writeFile(filePath, file.buffer);
    return path.join(folder, `${key}${ext}`);
  }

  async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join(__dirname, '../../dist/public', filePath);

    try {
      await fs.promises.unlink(fullPath);
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
        console.warn(`File not found: ${fullPath}`);
        return;
      }
      throw err;
    }
  }
  async modifyFile(
    filePath: string,
    file: Express.Multer.File,
  ): Promise<string> {
    await this.deleteFile(filePath);

    const folder = path.dirname(filePath);

    const newFilePath = await this.uploadFile(file, folder);

    return newFilePath;
  }
}
