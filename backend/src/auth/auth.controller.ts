import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GoogleAuthService } from './google-auth.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express'; // Correct import
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID } from '../../secrets';
import { UserAuthService } from '../auth/user-auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly googleAuthService: GoogleAuthService, private jwtService: JwtService, private userAuthService: UserAuthService) { }
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

    @Post('jwt')
    async generateJWTToken(@Req() req: any, @Res() res: Response) {
        const client = new OAuth2Client(GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
            idToken: req.body.token,
            audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID
        });
        const payload = ticket.getPayload();

        const jwt = this.jwtService.sign({ userId: payload.sub });
        return res.json({jwt: jwt});
    }

    @Post('register')
    async registerUser(@Req() req: any, @Res() res: Response) {
        // const client = new OAuth2Client(GOOGLE_CLIENT_ID);
        // const ticket = await client.verifyIdToken({
        //     idToken: req.body.token,
        //     audience: GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID
        // });
        // const payload = ticket.getPayload();

        const newUser = await this.userAuthService.registerUser(req.body.payload);

        // const jwt = this.jwtService.sign({ userId: payload.sub });
        return res.json(newUser);
    }
}
