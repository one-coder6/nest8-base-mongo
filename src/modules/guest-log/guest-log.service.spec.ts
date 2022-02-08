import { Test, TestingModule } from '@nestjs/testing';
import { GuestLogService } from './guest-log.service';

describe('GuestLogService', () => {
  let service: GuestLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuestLogService],
    }).compile();

    service = module.get<GuestLogService>(GuestLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
