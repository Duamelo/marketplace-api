import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
export declare class AuthenticationService {
    private readonly customerService;
    private readonly jwtService;
    private readonly configService;
    private readonly registerBaseService;
    constructor(customerService: CustomerService, jwtService: JwtService, configService: ConfigService, registerBaseService: RegisterBaseService);
    validateUser(username: string, pass: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
    }>;
    login(user: any): Promise<{
        user: any;
        token: string;
    }>;
    private comparePassword;
    getCookieWithJwtToken(userId: any): string;
    getCookieForLogOut(): string;
}
