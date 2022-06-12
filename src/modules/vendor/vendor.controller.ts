import { Controller, Body, Post, UseGuards, HttpCode, Req, Res, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { DoesUserExist } from '../common/guards/doesUserExist.guard';
import CreateVendorDto from './dto/create-vendor.dto';
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
}
