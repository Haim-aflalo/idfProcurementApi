import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Param,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post('check:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param() id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.imagesService.uploadFile(id, file);
  }
}
