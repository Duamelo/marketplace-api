import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { TokenPayload } from './interfaces/tokenPayload.interfaces';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly customerService: CustomerService,
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
          const user = await this.customerService.getById(payload.userId);
          if (!user) {
              throw new UnauthorizedException('You are not authorized to perform the operation');
          }
          return user;
    }
}
