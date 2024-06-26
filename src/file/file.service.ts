/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import * as multer from 'multer';
import { PrismaClient } from '@prisma/client';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FileService {
  private prisma = new PrismaClient();

  create(file: multer.File) {
    return this.prisma.file.create({
      data: {
        name: file.originalname,
        path: file.path,
      },
    });
  }

  async findAll(): Promise<CreateFileDto[]> {
    return await this.prisma.file.findMany();
  }

  async findOne(id: number): Promise<CreateFileDto> {
    return await this.prisma.file.findUnique({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.file.delete({
      where: { id },
    });
  }
}
