import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interfaces';
import { CustomerService } from '../customer/customer.service';
import { VendorService } from '../vendor/vendor.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly customerService;
    private readonly vendorService;
    private readonly configService;
    constructor(customerService: CustomerService, vendorService: VendorService, configService: ConfigService);
    validate(payload: TokenPayload): Promise<import("../vendor/vendor.entity").Vendor | import("../customer/customer.entity").Customer>;
}
export {};
