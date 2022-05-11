import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/tokenPayload.interfaces';
import { VendorService } from '../vendor/vendor.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly vendorService;
    private readonly configService;
    constructor(vendorService: VendorService, configService: ConfigService);
    validate(payload: TokenPayload): Promise<import("../vendor/vendor.entity").Vendor>;
}
export {};
