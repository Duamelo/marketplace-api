import { Controller, Body, Post, UseGuards, HttpCode, Req, Res, Get, Delete, Param, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import { DoesUserExist } from '../common/guards/doesUserExist.guard';
import { CustomerService } from './customer.service';
import CreateCustomerDto from './dto/create-customer.dto';
import UpdateCustomerDto from './dto/update-customer.dto';
import RequestWithCustomer from './interfaces/requestWithCustomer.interfaces';
import { Express } from 'express'
import { MailService } from '../mail/mail.service';
import ConfirmEmailDto from '../mail/dto/confirm-email.dto';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
// import { MailService } from '../mail/mail.service';


@Controller('customer')
export class CustomerController {

    constructor(
        private customerService: CustomerService,
        private registerBaseService: RegisterBaseService,
        private mailService: MailService
        ){}

    @HttpCode(200)
    @UseGuards(DoesUserExist)
    @Post('register')
    async register(@Body() customer: CreateCustomerDto) {
        const user = await this.customerService.create(customer);
        await this.mailService.sendVerificationLink(customer.email);
        return user;
    }

    // @Post('confirm')
    // async confirm(@Body() confirmationData: ConfirmEmailDto) {
    //   const email = await this.customerService.decodeConfirmationToken(confirmationData.token);
    //   await this.customerService.confirmEmail(email);
    // }
    @Get('/token/:token')
    async confirm(@Param('token') token:string, @Req() req, @Res() res) {
      const email = await this.registerBaseService.decodeConfirmationToken(token);
      await this.customerService.confirmEmail(email);
      return res.send('Email ' + email + ' Confirmé');
    }

    @Post('avatar')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() request: RequestWithCustomer, @UploadedFile() file: Express.Multer.File) {
      return this.customerService.addAvatar(request.user.id, file.buffer, file.originalname, file.mimetype);
    }

    @HttpCode(200)
    @Get('all')
    async getAllCustomers(){
        return await this.customerService.findAll();
    }

    @HttpCode(200)
    @Get(':id')
    async getCustomerById(@Param('id') id: number){
        return await this.customerService.findOneById(id);
    }

    @HttpCode(200)
    @Get(':email')
    async getCustomerByEmail(@Param('email') email: string){
        return await this.customerService.findOneByEmail(email);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UpdateCustomerDto){
        return await this.customerService.update(id, user);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Delete(':id')
    async deleteCustomer(@Param('id') id: number) {
        return await this.customerService.delete(id);
    }
}
