import { Module } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Demo, DemoSchema } from './entities/demo.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Demo.name, schema: DemoSchema }]),
  ],
  controllers: [DemoController],
  providers: [DemoService],
})
export class DemoModule {}
