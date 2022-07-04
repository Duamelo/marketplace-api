import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import Customer from './customer.entity';
import { RegisterBaseServiceModule } from '../common/services/register-base-service/register-base-service.module';
import { VendorModule } from '../vendor/vendor.module';
import { DatabaseFileModule } from '../database-file/database-file.module';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME')}`,
        },
      }),
    }),
    ConfigModule,
    forwardRef( () => VendorModule),
    RegisterBaseServiceModule,
    DatabaseFileModule,
    TypeOrmModule.forFeature([Customer])
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService]
})
export class CustomerModule {}
