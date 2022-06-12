import { Module } from '@nestjs/common';
import { DatabaseFileService } from './database-file.service';
import { DatabaseFileController } from './database-file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseFile from './databaseFile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DatabaseFile])
  ],
  providers: [DatabaseFileService],
  controllers: [DatabaseFileController],
  exports: [DatabaseFileService]
})
export class DatabaseFileModule {}
