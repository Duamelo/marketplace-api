import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { CustomerModule } from '../customer/customer.module';
import { RegisterBaseServiceModule } from '../common/services/register-base-service/register-base-service.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule,
    PassportModule,
    RegisterBaseServiceModule,
    CustomerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`,
        },
      }),
    }),
  ],
  providers: [
    AuthenticationService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthenticationController]
})
export class AuthenticationModule {}
