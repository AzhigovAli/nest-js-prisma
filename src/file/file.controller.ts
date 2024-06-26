/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { FileService } from './file.service';
import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { fileStorage } from './storage';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('file')
@ApiTags('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: fileStorage,
      limits: {
        fileSize: 10485760, // 10MB limit
      },
    }),
  )
  @ApiOperation({ summary: 'Create a new file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async create(@UploadedFile() file: multer.File) {
    return await this.fileService.create(file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all files' })
  async findAll(): Promise<CreateFileDto[]> {
    return await this.fileService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a file by ID' })
  @ApiParam({ name: 'id', description: 'File ID' })
  async findOne(@Param('id') id: string): Promise<CreateFileDto> {
    return await this.fileService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a file by ID' })
  @ApiParam({ name: 'id', description: 'File ID' })
  async remove(@Param('id') id: string): Promise<void> {
    await this.fileService.remove(+id);
  }
}
