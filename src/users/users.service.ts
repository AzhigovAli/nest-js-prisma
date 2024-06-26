/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async findByEmail(email: string, id?: number) {
    return this.prisma.user.findUnique({
      where: {
        email,
        id,
      },
    });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async create(dto: CreateUserDto) {
    return this.prisma.user.create({
      data: dto,
    });
  }

  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async update(id: number, dto: CreateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async updateAvatar(id: number, avatar: string | any) {
    return this.prisma.user.update({
      where: { id },
      data: { userAvatar: avatar },
    });
  }
}
