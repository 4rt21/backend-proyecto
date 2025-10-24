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
import { ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post(':folder')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Subir una imagen a una carpeta' })
  @ApiParam({
    name: 'folder',
    description: 'Carpeta destino para subir el archivo',
  })
  @ApiConsumes('multipart/form-data')
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

  @ApiOperation({ summary: 'Modificar una imagen existente' })
  @ApiParam({
    name: 'folder',
    description: 'Carpeta donde se encuentra la imagen',
  })
  @ApiParam({
    name: 'path',
    description: 'Nombre o ruta de la imagen a modificar',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Archivo de imagen con la nueva versión',
        },
      },
      required: ['file'],
    },
  })
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

  @ApiOperation({ summary: 'Eliminar una imagen por su ruta' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Ruta del archivo a eliminar' },
      },
      required: ['path'],
    },
  })
  @Delete()
  async deleteFile(@Body('path') path: string) {
    return this.imagesService.deleteFile(path);
  }
}
