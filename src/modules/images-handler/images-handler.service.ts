import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ImageHandler from './imageHandler.entity';

@Injectable()
export class ImagesHandlerService {

    constructor(
        @InjectRepository(ImageHandler)
        private readonly imageHandlerRepository: Repository<ImageHandler>
    ){}


    async add(dataBuffer: Buffer, filename: string, mimetype: string, productId: number){
        const newImage = await this.imageHandlerRepository.create({
            filename,
            data: dataBuffer,
            mimetype: mimetype,
            product: {
                id: productId
            }
        });

        await this.imageHandlerRepository.save(newImage);
        return newImage;
    }

    async getFileById(fileId: number) {
        const file = await this.imageHandlerRepository.findOne({where: {id: fileId}});
        if (!file) {
          throw new NotFoundException();
        }
        return file;
      }


}
export default ImagesHandlerService;
