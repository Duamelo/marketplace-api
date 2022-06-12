import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { TokenPayload } from './interfaces/tokenPayload.interfaces';
import { CustomerService } from '../customer/customer.service';
import { VendorService } from '../vendor/vendor.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly customerService: CustomerService,
        private readonly vendorService: VendorService,
        private readonly configService: ConfigService
        ) {
        super({
            //  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
                return request?.cookies?.Authentication;
            }]),
            ignoreExpiration: false,
             secretOrKey: configService.get('JWT_SECRET'),
        });
    }       

    async validate(payload: TokenPayload) {
          // check if user in the token actually exist
        const customer = await this.customerService.getById(payload.userId);
        const vendor = await this.vendorService.getById(payload.userId);

        if (!customer && !vendor) {
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }
        return customer ? customer : vendor;
    }
}
