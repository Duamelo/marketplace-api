import { Controller, Body, Post, UseGuards, HttpCode, Req, Res, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import { DoesUserExist } from '../common/guards/doesUserExist.guard';
import { CustomerService } from './customer.service';
import CreateCustomerDto from './dto/create-customer.dto';
import RequestWithCustomer from './interfaces/requestWithCustomer.interfaces';

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

    @Post('avatar')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() request: RequestWithCustomer, @UploadedFile() file: Express.Multer.File) {
      return this.customerService.addAvatar(request.user.id, file.buffer, file.originalname);
    }
}
