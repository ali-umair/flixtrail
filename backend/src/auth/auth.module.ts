import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleAuthService } from './google-auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JWT_SECRET_KEY } from '../../secrets.js';
import { UserAuthService } from './user-auth.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: JWT_SECRET_KEY, // Set your secret key
            signOptions: { expiresIn: '1h' }, // Token validity
          }),
    ],
    providers: [GoogleStrategy, GoogleAuthService, JwtStrategy, UserAuthService],
    controllers: [AuthController],
})
export class AuthModule {}
