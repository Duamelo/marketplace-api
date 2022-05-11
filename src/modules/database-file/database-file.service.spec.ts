import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseFileService } from './database-file.service';

describe('DatabaseFileService', () => {
  let service: DatabaseFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseFileService],
    }).compile();

    service = module.get<DatabaseFileService>(DatabaseFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
