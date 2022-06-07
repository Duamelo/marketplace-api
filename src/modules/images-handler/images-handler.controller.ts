import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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

    
    @Post('add/:productId')
    @UseGuards(JwtAuthenticationGuard)
    @UseInterceptors(FileInterceptor('file'))
    async add(@Req() request: RequestWithVendor, @UploadedFile() file: Express.Multer.File, @Param('productId', ParseIntPipe) productId: number){
        return await this.imageHandlerService.add(file.buffer, file.originalname, file.mimetype, productId);
    }

    @Get(':id')
    async getImageById(@Res() response: Response, @Param('id', ParseIntPipe) id: number) {
        const file = await this.imageHandlerService.getFileById(id);

        const stream = Readable.from(file.data);
        // response.set({
        //     'Content-Disposition': `inline; filename="${file.filename}"`,
        //     'Content-Type': file.mimetype
        // });
            
        stream.pipe(response);
    }
}
