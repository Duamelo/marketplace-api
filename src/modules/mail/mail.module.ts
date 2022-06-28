import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import { JwtService } from '@nestjs/jwt';


@Global() //pour pouvoir envoyer les emails de partout dans l'appli
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('MAIL_HOST'),
          port: 587,
          secure: false,
          auth: {
            user: configService.get('MAIL_USER'),
            pass: configService.get('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"No Reply" <${configService.get('MAIL_FROM')}>`,
        },

        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(), 
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
      
    }),
  
],
  providers: [MailService, RegisterBaseService, JwtService],
  exports: [MailService, RegisterBaseService, JwtService]

})
export class MailModule {}
