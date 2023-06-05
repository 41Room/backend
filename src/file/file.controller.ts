import {
  Bind,
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { Response } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  multerDiskOptions,
  multerMemoryOptions,
} from 'src/config/multer.option';
import { FileDTO } from './dto';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerMemoryOptions))
  @Bind(UploadedFile())
  async singleUpload(
    file: Express.Multer.File,
    @Res() res: Response,
    @Body() fileInfo: FileDTO,
  ) {
    try {
      const result = await this.fileService.singleUpload(file, fileInfo);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }

  @Post('/multi')
  @UseInterceptors(FilesInterceptor('files', null, multerMemoryOptions))
  @Bind(UploadedFiles())
  async multipleUpload(
    files: Express.Multer.File[],
    @Res() res: Response,
    @Body() fileInfo: FileDTO,
  ) {
    try {
      const result = await this.fileService.multiUpload(files, fileInfo);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: 'success',
        data: result,
      });
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: e.message,
      });
    }
  }
}
