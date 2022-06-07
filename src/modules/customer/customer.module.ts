import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import Customer from './customer.entity';
import { RegisterBaseServiceModule } from '../common/services/register-base-service/register-base-service.module';
import { VendorModule } from '../vendor/vendor.module';

@Module({
  imports: [
    forwardRef( () => VendorModule),
    RegisterBaseServiceModule,
    TypeOrmModule.forFeature([Customer])
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
  exports: [CustomerService]
})
export class CustomerModule {}
