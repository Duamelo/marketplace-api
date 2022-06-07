import { Controller, Body, Post, UseGuards, HttpCode, Req, Res, Get } from '@nestjs/common';
import { DoesUserExist } from '../common/guards/doesUserExist.guard';
import CreateVendorDto from './dto/create-vendor.dto';
import { VendorService } from './vendor.service';

@Controller('vendor')
export class VendorController {

    constructor(
        private vendorService: VendorService
        ){}

    @HttpCode(200)
    @UseGuards(DoesUserExist)
    @Post('register')
    async register(@Body() vendor: CreateVendorDto) {
        return await this.vendorService.create(vendor);
    }
}
