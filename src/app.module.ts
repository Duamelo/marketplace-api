import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database/database.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { CustomerModule } from './modules/customer/customer.module';
import * as Joi from '@hapi/joi';
import { RegisterBaseServiceModule } from './modules/common/services/register-base-service/register-base-service.module';
import { ShopModule } from './modules/shop/shop.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { DatabaseFileModule } from './modules/database-file/database-file.module';
import { ImagesHandlerModule } from './modules/images-handler/images-handler.module';
import { CartModule } from './modules/cart/cart.module';
import { CommandModule } from './modules/command/command.module';
import { ShippingModule } from './modules/shipping/shipping.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      })
    }),
    DatabaseModule,
    RegisterBaseServiceModule,
    VendorModule,
    CustomerModule,
    AuthenticationModule,
    ShopModule,
    ProductModule,
    CategoryModule,
    DatabaseFileModule,
    ImagesHandlerModule,
    CartModule,
    CommandModule,
    ShippingModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService,
  ],
})
export class AppModule {}