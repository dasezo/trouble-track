import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RtStrategy.extractJWTFromCookie,
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: any) {
    return payload;
  }

  /**
   ** Extracts the JWT (refresh token) from the request cookies
   */
  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.jwt_refresh) {
      return req.cookies.jwt_refresh;
    }
    return null;
  }
}
