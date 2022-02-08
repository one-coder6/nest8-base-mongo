import { Module } from '@nestjs/common';
import { GuestLogService } from './guest-log.service';
import { GuestLogController } from './guest-log.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GuestLog, GuestLogSchema } from './entities/guest-log.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GuestLog.name, schema: GuestLogSchema },
    ]),
  ],
  controllers: [GuestLogController],
  providers: [GuestLogService],
})
export class GuestLogModule {}
