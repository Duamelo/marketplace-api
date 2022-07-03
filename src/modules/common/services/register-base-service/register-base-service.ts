import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterBaseService {
    constructor(
        private  readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ){ }

    public async generateToken(user){
        const {firstName, lastName, email, phone, address} = user;
        const token = await this.jwtService.signAsync({firstName, lastName, email, phone, address});
        return token;
    }

    public async hashPassword(password) {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }

    public async decodeConfirmationToken(token: string) {
        try {
          const payload = await this.jwtService.verify(token, {
            secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
          });
     
          if (typeof payload === 'object' && 'email' in payload) {
            console.log(payload.email);
            return payload.email;
          }
          throw new BadRequestException();
        } catch (error) {
          if (error?.name === 'TokenExpiredError') {
            throw new BadRequestException('Email confirmation token expired');
          }
          throw new BadRequestException('Bad confirmation token');
        }
    }
}
export default RegisterBaseService;