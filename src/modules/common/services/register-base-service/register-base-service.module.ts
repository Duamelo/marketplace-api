import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import RegisterBaseService from './register-base-service';

@Module({
    imports: [
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
    providers: [RegisterBaseService],
    controllers: [],
    exports: [RegisterBaseService]
  })
export class RegisterBaseServiceModule {}
