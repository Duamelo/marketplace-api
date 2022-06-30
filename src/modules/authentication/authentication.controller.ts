import { Controller, Post, UseGuards, HttpCode, Req, Res, Get } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import RequestWithCustomer from '../customer/interfaces/requestWithCustomer.interfaces';
import RequestWithVendor from '../vendor/interfaces/requestWithVendor.interface';
import JwtAuthenticationGuard from './jwt.authentication.guard';


@Controller('authentication')
export class AuthenticationController {
    constructor(private authService: AuthenticationService){}

    @UseGuards(JwtAuthenticationGuard)
    @Get()
    authenticate(@Req() request: RequestWithCustomer)
    {
        const user = request.user;
        user.password = undefined;
        return user;
    }


    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() request: RequestWithCustomer | RequestWithVendor, @Res() response: Response)
    {
        const { user } = request;
        const cookie = this.authService.getCookieWithJwtToken(user.id);
        response.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return response.send(user);
    }


    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    async logOut(@Req() request: RequestWithCustomer | RequestWithVendor, @Res() response: Response)
    {
        response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
        return response.sendStatus(200);
    }
}