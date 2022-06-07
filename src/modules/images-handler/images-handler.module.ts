import { Module } from '@nestjs/common';
import { ImagesHandlerService } from './images-handler.service';
import { ImagesHandlerController } from './images-handler.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ImageHandler from './imageHandler.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageHandler])
  ],
  providers: [ImagesHandlerService],
  controllers: [ImagesHandlerController]
})
export class ImagesHandlerModule {}
