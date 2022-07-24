import { Controller, Get, Param, ParseIntPipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Readable } from 'typeorm/platform/PlatformTools';
import JwtAuthenticationGuard from '../authentication/jwt.authentication.guard';
import RequestWithVendor from '../vendor/interfaces/requestWithVendor.interface';
import ImagesHandlerService from './images-handler.service';

@Controller('images-handler')
export class ImagesHandlerController {

    constructor(
        private readonly imageHandlerService: ImagesHandlerService
    ){}


    @Post('/products/:productId')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async add(@Req() request: RequestWithVendor, @UploadedFile() file: Express.Multer.File, @Param('productId', ParseIntPipe) productId: number){
        return await this.imageHandlerService.add(file.buffer, file.originalname, file.mimetype, productId);
    }

    @Get('products/:productId')
    async getImageById(@Res() response: Response, @Param('productId', ParseIntPipe) productId: number) {
        const file = await this.imageHandlerService.getFileById(productId);
        var stream = [];
        file.map((f)=>{
            stream.push(Readable.from(f.data));
        });
        stream.map((s)=>{
            s.pipe(response);
        });

        // response.set({
        //     'Content-Disposition': `inline; filename="${file.filename}"`,
        //     'Content-Type': file.mimetype
        // });
    }
}
