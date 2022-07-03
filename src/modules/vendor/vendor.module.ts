import { forwardRef, Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { RegisterBaseServiceModule } from '../common/services/register-base-service/register-base-service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Vendor from './vendor.entity';
import { CustomerModule } from '../customer/customer.module';
import { MailModule } from '../mail/mail.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseFileModule } from '../database-file/database-file.module';

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
    forwardRef( () => CustomerModule),
    RegisterBaseServiceModule,
    DatabaseFileModule,
    TypeOrmModule.forFeature([Vendor])
  ],
  providers: [VendorService],
  controllers: [VendorController],
  exports: [VendorService]
})
export class VendorModule {}