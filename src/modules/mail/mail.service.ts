import { Inject, Injectable, ParseIntPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { Repository } from 'typeorm';
import { TokenPayload } from '../authentication/interfaces/tokenPayload.interfaces';
import Customer from '../customer/customer.entity';

@Injectable()
export class MailService {
    private nodemailerTransport: Mail;
 
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository <Customer>
    )
    
    {
    this.nodemailerTransport = createTransport({
      service: configService.get('MAIL_SERVICE'),
      auth: {
        user: configService.get('MAIL_USER'),
        pass: configService.get('MAIL_PASSWORD'),
      }
    });
    }
 
    async sendMail(options: Mail.Options) {
        return this.nodemailerTransport.sendMail(options);
    }

    async sendVerificationLink(userId: string ) {
        
      const token = this.jwtService.sign(userId, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}s`
      });
    
      const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
    
      const text = `Welcome to the application. To confirm the email address, click here: ${url}`;
      
      const user = await this.customerRepository.find({where:{id : Number(userId)}});
      if (user.length != 0) 
        var email = user[0].email;

      return this.sendMail({
        
        to: email,
        subject: 'Email confirmation',
        text,
      })
    }
}
