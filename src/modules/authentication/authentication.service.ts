import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomerService } from '../customer/customer.service';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import { TokenPayload } from './interfaces/tokenPayload.interfaces';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly customerService: CustomerService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly registerBaseService: RegisterBaseService
    ){ }

    async validateUser(username: string, pass: string) {
        
        // find if user exist with this email
        const user = await this.customerService.getByEmail(username);

        if (!user) {
            return null;
        }

        // find if user password match
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = user;

        return result;
    }


    public async login(user) {
        const token = await this.registerBaseService.generateToken(user);
        return { user, token };
    }


    private async comparePassword(enteredPassword, dbPassword) {
        const match = await bcrypt.compare(enteredPassword, dbPassword);
        return match;
    }

    
    public getCookieWithJwtToken(userId)
    {
        const payload: TokenPayload = { userId };
        const token = this.jwtService.sign(payload);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
        
    }


    public getCookieForLogOut()
    {
        return `Authentication=; HttpOnly; Path=/; MAx-Age=0`;
    }

}
