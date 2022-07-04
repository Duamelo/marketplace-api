import { Controller, Body, Post, UseGuards, HttpCode, Req, Res, Get, ValidationPipe, UsePipes, Param, Put, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import { DoesUserExist } from '../common/guards/doesUserExist.guard';
import { Roles } from '../common/roles/role.decorator';
import Role from '../common/roles/role.enum';
import RegisterBaseService from '../common/services/register-base-service/register-base-service';
import RequestWithCustomer from '../customer/interfaces/requestWithCustomer.interfaces';
import { MailService } from '../mail/mail.service';
import CreateVendorDto from './dto/create-vendor.dto';
import UpdateVendorDto from './dto/update-vendor.dto';
import { VendorService } from './vendor.service';

@Controller('vendor')
export class VendorController {

    constructor(
        private vendorService: VendorService,
        private registerBaseService: RegisterBaseService,
        ){}

    @HttpCode(200)
    @UsePipes(new ValidationPipe({transform:true})) //pour pouvoir utiliser la valeur du role dans le vendor.dto au lieu de la valeur par défaut du role dans base.entity
    @Post('register')
    async register(@Body() vendor: CreateVendorDto) {
        const user = await this.vendorService.create(vendor);
        console.log("controller");
        await this.vendorService.sendVerificationLink(vendor.email);
        return user;
    }

    @Get('/token/:token')
    async confirm(@Param('token') token:string, @Req() req, @Res() res) {
      const email = await this.registerBaseService.decodeConfirmationToken(token);
      await this.vendorService.confirmEmail(email);
      return res.send('Email ' + email + ' confirmé');
    }

    @Post('avatar')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async addAvatar(@Req() request: RequestWithCustomer, @UploadedFile() file: Express.Multer.File) {
      return this.vendorService.addAvatar(request.user.id, file.buffer, file.originalname, file.mimetype);
    }

    
    @Roles(Role.Admin)
    @Get()
    getVendors(){
        return this.vendorService.findAll();
    }

    @Roles(Role.Admin)
    @Get(':id')
    getVendorById(@Param('id') id: number){
        return this.vendorService.findOneById(id);
    }

    @Get('/email/:email')
    getVendorByEmail(@Param('email') email: string){
        return this.vendorService.findOneByEmail(email);
    }

    @HttpCode(200)
    @UseGuards(JwtAuthenticationGuard)
    @Roles(Role.Vendor)
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UpdateVendorDto){
        return await this.vendorService.updateVendor(id, user);
    }

    @Roles(Role.Admin)
    @Delete('/:id')
    async deleteVendor(@Param('id') id: number) {
        return await this.vendorService.deleteVendor(id);
    }
}