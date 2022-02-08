import { Test, TestingModule } from '@nestjs/testing';
import { GuestLogController } from './guest-log.controller';
import { GuestLogService } from './guest-log.service';

describe('GuestLogController', () => {
  let controller: GuestLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GuestLogController],
      providers: [GuestLogService],
    }).compile();

    controller = module.get<GuestLogController>(GuestLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
