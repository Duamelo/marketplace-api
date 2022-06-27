import { Controller, Body, Post, UseGuards, HttpCode, Req, Res, Get, Delete, Param, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import { DoesUserExist } from '../common/guards/doesUserExist.guard';
import { CustomerService } from './customer.service';
import CreateCustomerDto from './dto/create-customer.dto';
import UpdateCustomerDto from './dto/update-customer.dto';
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
      return this.customerService.addAvatar(request.user.id, file.buffer, file.originalname, file.mimetype);
    }


    @Get('all')
    async getCustomers(){
        return await this.customerService.getAllCustomer();
    }

    @Get(':id')
    async getCustomerById(@Param('id') id: number){
        return await this.customerService.getById(id);
    }

    @Get(':email')
    async getCustomerByEmail(@Param('email') email: string){
        return await this.customerService.getByEmail(email);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UpdateCustomerDto){
        return await this.customerService.updateCustomer(id, user);
    }

    @HttpCode(200)
    @Delete(':id')
    async deleteCustomer(@Param('id') id: number) {
        return await this.customerService.deleteCustomer(id);
    }
}
