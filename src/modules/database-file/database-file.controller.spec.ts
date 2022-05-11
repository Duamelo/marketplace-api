import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseFileController } from './database-file.controller';

describe('DatabaseFileController', () => {
  let controller: DatabaseFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseFileController],
    }).compile();

    controller = module.get<DatabaseFileController>(DatabaseFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
