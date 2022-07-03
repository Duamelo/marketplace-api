import { Injectable } from '@nestjs/common';
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
      service: this.configService.get('MAIL_SERVICE'),
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      }
    });
    }
 
    async sendMail(options: Mail.Options) {
        return await this.nodemailerTransport.sendMail(options);
    }

    async sendVerificationLink(email: string ) {
      //const payload: TokenPayload = { userId };
      const token = this.jwtService.sign({email:email}, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        expiresIn: `${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}`,
        
      });
    
      // const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?token=${token}`;
      const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}${token}`;

    
      const text = `Welcome to ahi marketplace. To confirm the email address, click here: ${url} . \n
      The link will expire in ${this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}`;
      
      // const user = await this.customerRepository.find({where:{email : email}});
      // if (user.length != 0) 
      //   var email = user[0].email;

      return await this.sendMail({
        
        to: email,
        subject: 'Email confirmation',
        text,
      })
    }

    
}
