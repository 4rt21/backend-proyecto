import {
  Controller,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post(':folder')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('folder') folder: string,
  ) {
    return this.imagesService.uploadFile(file, folder);
  }

  @Put(':folder/:path')
  @UseInterceptors(FileInterceptor('file'))
  async modifyFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10240 * 10240 }),
          new FileTypeValidator({
            fileType: 'image/*',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param('folder') folder: string,
    @Param('path') path: string,
  ) {
    const filepath = `${folder}/${path}`;
    return this.imagesService.modifyFile(file, filepath);
  }

  @Delete()
  async deleteFile(@Body('path') path: string) {
    return this.imagesService.deleteFile(path);
  }
}
