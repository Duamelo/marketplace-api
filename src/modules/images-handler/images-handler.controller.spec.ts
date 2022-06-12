import { Test, TestingModule } from '@nestjs/testing';
import { ImagesHandlerController } from './images-handler.controller';

describe('ImagesHandlerController', () => {
  let controller: ImagesHandlerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesHandlerController],
    }).compile();

    controller = module.get<ImagesHandlerController>(ImagesHandlerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
