import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import { VendorService } from '../vendor/vendor.service';
export declare class AuthenticationService {
    private readonly customerService;
    private readonly vendorService;
    private readonly jwtService;
    private readonly configService;
    private readonly registerBaseService;
    constructor(customerService: CustomerService, vendorService: VendorService, jwtService: JwtService, configService: ConfigService, registerBaseService: RegisterBaseService);
    validateUser(email: string, pass: string): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        address: string;
        role: import("../common/roles/role.enum").default;
    }>;
    login(user: any): Promise<{
        user: any;
        token: string;
    }>;
    private comparePassword;
    getCookieWithJwtToken(userId: any): string;
    getCookieForLogOut(): string;
}
