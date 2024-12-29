import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './google-auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express'; // Correct import

@Controller('auth')
export class AuthController {
    constructor(private readonly googleAuthService: GoogleAuthService, private jwtService: JwtService) { }
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {
        // This initiates Google OAuth flow
    }

    // @Get('google/callback')
    // @UseGuards(AuthGuard('google'))
    // googleAuthCallback(@Req() req) {
    //     // Handle the callback and return user information
    //     return {
    //         message: 'User info from Google',
    //         user: req.user,
    //     };
    // }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
        const user = req.user; // User info from Google
        const payload = { email: user.email, sub: user.email }; // Customize as needed

        // Generate a JWT
        const jwt = this.jwtService.sign(payload);

        // Option 1: Send the JWT in the response body
        return res.json({ message: 'Authentication successful', jwt });

        // Option 2: Redirect the user to the frontend with the JWT
        // const redirectUrl = `http://localhost:4200/auth/callback?token=${jwt}`;
        // return res.redirect(redirectUrl);
    }
}
