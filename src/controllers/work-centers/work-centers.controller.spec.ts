import { Test, TestingModule } from '@nestjs/testing';
import { WorkCentersController } from './work-centers.controller';

describe('WorkCentersController', () => {
  let controller: WorkCentersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkCentersController],
    }).compile();

    controller = module.get<WorkCentersController>(WorkCentersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
