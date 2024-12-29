import { Module } from '@nestjs/common';
import { GoogleStrategy } from './google.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GoogleAuthService } from './google-auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'your-secret-jwt-key', // Set your secret key
            signOptions: { expiresIn: '1h' }, // Token validity
          }),
    ],
    providers: [GoogleStrategy, GoogleAuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
