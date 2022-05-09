import { Controller, Body, Post, UseGuards, HttpCode, Req, Res, Get } from '@nestjs/common';
import { DoesUserExist } from '../common/guards/doesUserExist.guard';
import { CustomerService } from './customer.service';
import CreateCustomerDto from './dto/create-customer.dto';

@Controller('customer')
export class CustomerController {

    constructor(
        private customerService: CustomerService
        ){}

    @HttpCode(200)
    @UseGuards(DoesUserExist)
    @Post('register')
    async register(@Body() customer: CreateCustomerDto) {
        return await this.customerService.create(customer);
    }
}
