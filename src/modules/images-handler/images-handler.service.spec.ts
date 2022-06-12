import { Test, TestingModule } from '@nestjs/testing';
import { ImagesHandlerService } from './images-handler.service';

describe('ImagesHandlerService', () => {
  let service: ImagesHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagesHandlerService],
    }).compile();

    service = module.get<ImagesHandlerService>(ImagesHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
