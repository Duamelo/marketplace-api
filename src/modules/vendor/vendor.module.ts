import { forwardRef, Module } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { VendorController } from './vendor.controller';
import { RegisterBaseServiceModule } from '../common/services/register-base-service/register-base-service.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Vendor from './vendor.entity';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports: [
    forwardRef( () => CustomerModule),
    RegisterBaseServiceModule,
    TypeOrmModule.forFeature([Vendor])
  ],
  providers: [VendorService],
  controllers: [VendorController],
  exports: [VendorService]
})
export class VendorModule {}