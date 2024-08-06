import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Body,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { uploadDto } from './dto/upload.dto';
import { DeleteDto } from './dto/delete.dto';

@ApiTags('File')
@Controller({ path: 'file', version: '2' })
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiOperation({ summary: 'File upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file',
    type: uploadDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: any) {
    return this.fileService.upload(file);
  }
  @ApiOperation({ summary: 'File delete' })
  @Delete()
  delete(@Body() data: DeleteDto) {
    return this.fileService.delete(data);
  }
}
