import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,QueryRunner } from 'typeorm';
import DatabaseFile from './databaseFile.entity';

@Injectable()
export class DatabaseFileService {
    constructor(
        @InjectRepository(DatabaseFile)
        private readonly databaseFilesRepository : Repository<DatabaseFile>
    ){}


    async uploadDatabaseFileWithQueryRunner(dataBuffer: Buffer, filename: string, mimetype: string, queryRunner: QueryRunner) {
        const newFile = await queryRunner.manager.create(DatabaseFile, {
          filename,
          data: dataBuffer,
          mimetype: mimetype
        })
        await queryRunner.manager.save(DatabaseFile, newFile);
        return newFile;
    }
     
    async deleteFileWithQueryRunner(fileId: number, queryRunner: QueryRunner) {
        const deleteResponse = await queryRunner.manager.delete(DatabaseFile, fileId);
        if (!deleteResponse.affected) {
            throw new NotFoundException();
        }
    }

    async uploadDatabaseFile(dataBuffer: Buffer, filename: string, mimetype: string) {
        const newFile = await this.databaseFilesRepository.create({
          filename,
          data: dataBuffer,
          mimetype: mimetype
        })
        await this.databaseFilesRepository.save(newFile);
        return newFile;
    }
     
    async getFileById(fileId: number) {
      const file = await this.databaseFilesRepository.findOne({where: {id: fileId}});
      if (!file) {
        throw new NotFoundException();
      }
      return file;
    }
}
export default DatabaseFileService;
