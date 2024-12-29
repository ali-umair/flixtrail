import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'your-secret-jwt-key', // Ensure you have this environment variable set
    });
  }

  async validate(payload: any) {
    // Here you can perform additional validation or retrieve user details
    return { userId: payload.sub, email: payload.email };
  }
}