import { Controller, Body, Post, UseGuards, HttpCode, Req, Res, Get, Delete, Param, UseInterceptors, UploadedFile, Put, ValidationPipe, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import { CustomerService } from './customer.service';
import CreateCustomerDto from './dto/create-customer.dto';
import UpdateCustomerDto from './dto/update-customer.dto';
import RequestWithCustomer from './interfaces/requestWithCustomer.interfaces';
import { Express } from 'express'
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import { Roles } from '../common/roles/role.decorator';
import Role from '../common/roles/role.enum';


@Controller('customers')
export class CustomerController {

    constructor(
        private customerService: CustomerService,
        private registerBaseService: RegisterBaseService,
        ){}

    @HttpCode(200)
    //@UseGuards(DoesUserExist)
    @UsePipes(new ValidationPipe({transform:true}))
    @Post()
    async register(@Body() customer: CreateCustomerDto) {
        const user = await this.customerService.create(customer);
        await this.customerService.sendVerificationLink(customer.email);
        return user;
    }

    @Get('/token/:token')
    async confirm(@Param('token') token:string, @Req() req, @Res() res) {
      const email = await this.registerBaseService.decodeConfirmationToken(token);
      await this.customerService.confirmEmail(email);
      return res.send('Email ' + email + ' confirmé');
    }

    @Post('avatar')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() request: RequestWithCustomer, @UploadedFile() file: Express.Multer.File) {
      return this.customerService.addAvatar(request.user.id, file.buffer, file.originalname, file.mimetype);
    }

    @HttpCode(200)
    @Roles(Role.Admin)
    @Get()
    async getAllCustomers(){
        return await this.customerService.findAll();
    }

    @HttpCode(200)
    @Roles(Role.Admin)
    @Get(':id')
    async getCustomerById(@Param('id') id: number){
        return await this.customerService.findOneById(id);
    }

    @HttpCode(200)
    @Get('/email/:email')
    async getCustomerByEmail(@Param('email') email: string){
        return await this.customerService.findOneByEmail(email);
    }

    @HttpCode(200)
    @Roles(Role.Customer)
    @UseGuards(JwtAuthenticationGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UpdateCustomerDto){
        return await this.customerService.update(id, user);
    }

    @HttpCode(200)
    @Roles(Role.Admin)
    @UseGuards(JwtAuthenticationGuard)
    @Delete(':id')
    async deleteCustomer(@Param('id') id: number) {
        return await this.customerService.delete(id);
    }
}
