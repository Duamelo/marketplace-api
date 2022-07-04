import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class MailService {
    private nodemailerTransport: Mail;
 
  constructor(
    private readonly configService: ConfigService,
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
}
