import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Customer from 'src/modules/customer/customer.entity';
import Vendor from 'src/modules/vendor/vendor.entity';
import Category from 'src/modules/category/category.entity';
import Product from 'src/modules/product/product.entity';
import Shop from 'src/modules/shop/shop.entity';
import DatabaseFile from 'src/modules/database-file/databaseFile.entity';
import ImageHandler from 'src/modules/images-handler/imageHandler.entity';
import Cart from 'src/modules/cart/cart.entity';
import Command from 'src/modules/command/command.entity';
 
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [
          Customer, Vendor, Category, Product, Shop, DatabaseFile, ImageHandler, Cart, Command
        ],
        synchronize: true,
      })
    }),
  ],
})
export class DatabaseModule {}