import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../authentication/interfaces/tokenPayload.interfaces';
import { User } from '../common/entities/users/base.entity';


@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService,
              private readonly configService: ConfigService,
              private readonly jwtService: JwtService,
               ) {}


  
  async sendUserConfirmation(user: User, userId) {
    
    const load: TokenPayload = { userId };
    const token = this.jwtService.sign(load, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}`
    });

    const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Ahi ! Confirm your Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      
      context: { 
        name: user.firstName,
        url,
        },
    });
  }
}