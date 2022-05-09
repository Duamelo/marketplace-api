import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CustomerService } from '../customer/customer.service';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import { TokenPayload } from './interfaces/tokenPayload.interfaces';
import { VendorService } from '../vendor/vendor.service';

@Injectable()
export class AuthenticationService {
    constructor(
        private readonly customerService: CustomerService,
        private readonly vendorService: VendorService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly registerBaseService: RegisterBaseService
    ){ }

    async validateUser(email: string, pass: string) {
        
        // find if user exist with this email
        const customer = await this.customerService.getByEmail(email);
        const vendor = await this.vendorService.getByEmail(email);


        console.log("customer")
        console.log(customer);
        console.log(vendor);
        if (!customer && !vendor) {
            return null;
        }

        // find if customer or vendor password match
        const match = await this.comparePassword(pass, customer ? customer.password : vendor.password);
        
        if (!match) {
            return null;
        }

        // tslint:disable-next-line: no-string-literal
        const { password, ...result } = customer ? customer : vendor;

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
