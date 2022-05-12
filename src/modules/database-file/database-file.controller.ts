import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Res, StreamableFile, UseInterceptors } from '@nestjs/common';
import { Readable } from 'typeorm/platform/PlatformTools';
import DatabaseFileService from './database-file.service';
import { Response } from 'express';
 

@Controller('database-file')
@UseInterceptors(ClassSerializerInterceptor)
export class DatabaseFileController {

    constructor(
        private readonly databaseFilesService: DatabaseFileService
    ){}


//     @Get(':id')
//     async getDatabaseFileById(@Param('id', ParseIntPipe) id: number, @Res({ passthrough: true }) response: Response) {
//         const file = await this.databaseFilesService.getFileById(id);
    
//         const stream = Readable.from(file.data);
    
//         response.set({
//         'Content-Disposition': `inline; filename="${file.filename}"`,
//         'Content-Type': file.mimetype
//         });
    
//         return new StreamableFile(stream);
//   }

    @Get(':id')
    async getDatabaseFileById(@Res() response: Response, @Param('id', ParseIntPipe) id: number) {
        const file = await this.databaseFilesService.getFileById(id);

        const stream = Readable.from(file.data);
        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': file.mimetype
            });
            
        stream.pipe(response);
    }
}
