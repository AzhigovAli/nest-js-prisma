/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'test123',
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException('У вас нет доступа');
    }
    return {
      id: user.id,
    };
  }
}
