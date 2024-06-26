/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LoginDto } from './dto/login-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  private prisma: PrismaClient;
  sms: string | PromiseLike<string>;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(dto: CreateUserDto): Promise<any> {
    try {
      const userData = await this.prisma.user.create({
        data: {
          ...dto,
        },
      });
      return userData;
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Failed to register user.');
    }
  }

  async login(user: LoginDto): Promise<LoginDto> {
    return user; // Example placeholder; you might want to implement token generation here.
  }

  async sendSms(): Promise<string> {
    return this.sms; // Assuming `sms` is a property of your service.
  }

  async resetPassword(email: string, newPassword: string): Promise<void> {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new ForbiddenException('User not found.');
      }

      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: newPassword },
      });
    } catch (error) {
      console.log(error);
      throw new ForbiddenException('Failed to reset password.');
    }
  }
}
