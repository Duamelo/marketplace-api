import { Controller, Body, Post, UseGuards, HttpCode, Req, Res, Get, UsePipes, ValidationPipe, Delete, Param, Put } from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import { Roles } from '../common/decorators/core/roles.decorator';
import { DoesUserExist } from '../common/guards/doesUserExist.guard';
import Role from '../common/roles/role.enum';
import UpdateCustomerDto from '../customer/dto/update-customer.dto';
import CreateVendorDto from './dto/create-vendor.dto';
import UpdateVendorDto from './dto/update-vendor.dto';
import { VendorService } from './vendor.service';

@Controller('vendor')
export class VendorController {

    constructor(
        private vendorService: VendorService
        ){}

    @HttpCode(200)
    //@UseGuards(DoesUserExist)
    @Post('register')
    @UsePipes(new ValidationPipe({transform:true})) //pour pouvoir utiliser la valeur du role dans le vendor.dto au lieu de la valeur par défaut du role dans base.entity
    async register(@Body() vendor: CreateVendorDto) {
        return await this.vendorService.create(vendor);
    }

    //get all vendor
    @Roles(Role.Admin)
    @Get()
    getCustomer(){
        return this.vendorService.getAllVendor();
    }

    //get vendor by id
    @Roles(Role.Admin)
    @Get(':id')
    getCustomerById(@Param('id') id: number){
        return this.vendorService.getById(id);
    }

    //get vendor by email
    @Get('/email/:email')
    getCustomerByEmail(@Param('email') email: string){
        return this.vendorService.getByEmail(email);
    }

    //update
    @HttpCode(200)
    //@UsePipes(ValidationPipe)
    @UseGuards(JwtAuthenticationGuard)
    @Roles(Role.Vendor)
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: UpdateVendorDto){
        return await this.vendorService.updateVendor(id, user);
    }

    //delete customer 
    @Roles(Role.Admin)
    @Delete('/:id')
    async deleteVendor(@Param('id') id: number) {
        return await this.vendorService.deleteVendor(id);
    }
}
